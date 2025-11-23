// SphereImageGrid.tsx – Interactive 3D image sphere component
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Link as LinkIcon } from 'lucide-react';

export interface Position3D {
    x: number;
    y: number;
    z: number;
}

export interface SphericalPosition {
    theta: number; // Azimuth angle in degrees
    phi: number;   // Polar angle in degrees
    radius: number; // Distance from center
}

export interface WorldPosition extends Position3D {
    scale: number;
    zIndex: number;
    isVisible: boolean;
    fadeOpacity: number;
    originalIndex: number;
}

export interface ImageData {
    id: string;
    src?: string;
    component?: React.ReactNode;
    alt: string;
    title?: string;
    description?: string;
    link?: string; // project repo link
    web?: string; // live demo link
    tech?: string[]; // tech stack
}

export interface SphereImageGridProps {
    images?: ImageData[];
    containerSize?: number;
    sphereRadius?: number;
    dragSensitivity?: number;
    momentumDecay?: number;
    maxRotationSpeed?: number;
    baseImageScale?: number;
    hoverScale?: number;
    perspective?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    className?: string;
}

interface RotationState { x: number; y: number; z: number; }
interface VelocityState { x: number; y: number; }
interface MousePosition { x: number; y: number; }

const SPHERE_MATH = {
    degreesToRadians: (degrees: number) => degrees * (Math.PI / 180),
    radiansToDegrees: (radians: number) => radians * (180 / Math.PI),
    normalizeAngle: (angle: number) => {
        while (angle > 180) angle -= 360;
        while (angle < -180) angle += 360;
        return angle;
    },
};

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
    images = [],
    containerSize = 400,
    sphereRadius = 200,
    dragSensitivity = 0.5,
    momentumDecay = 0.95,
    maxRotationSpeed = 5,
    baseImageScale = 0.12,
    hoverScale = 1.2,
    perspective = 1000,
    autoRotate = false,
    autoRotateSpeed = 0.3,
    className = '',
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [rotation, setRotation] = useState<RotationState>({ x: 15, y: 15, z: 0 });
    const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
    const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
    const animationFrame = useRef<number | null>(null);

    const actualSphereRadius = sphereRadius || containerSize * 0.5;
    const baseImageSize = containerSize * baseImageScale;

    // Generate positions using Fibonacci sphere distribution
    const generateSpherePositions = useCallback((): SphericalPosition[] => {
        const positions: SphericalPosition[] = [];
        const count = images.length;
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        const angleInc = (2 * Math.PI) / goldenRatio;
        for (let i = 0; i < count; i++) {
            const t = i / count;
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = angleInc * i;
            let phi = inclination * (180 / Math.PI);
            let theta = (azimuth * (180 / Math.PI)) % 360;
            const randomOffset = (Math.random() - 0.5) * 20;
            theta = (theta + randomOffset) % 360;
            phi = Math.max(5, Math.min(175, phi));
            positions.push({ theta, phi, radius: actualSphereRadius });
        }
        return positions;
    }, [images.length, actualSphereRadius]);

    const calculateWorldPositions = useCallback((): WorldPosition[] => {
        return imagePositions.map((pos, idx) => {
            const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
            const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
            const rotX = SPHERE_MATH.degreesToRadians(rotation.x);
            const rotY = SPHERE_MATH.degreesToRadians(rotation.y);

            // Convert spherical to cartesian
            let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
            let y = pos.radius * Math.cos(phiRad);
            let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

            // Apply Y rotation (horizontal)
            const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
            const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
            x = x1; z = z1;

            // Apply X rotation (vertical)
            const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
            const z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
            y = y1; z = z2;

            const worldPos: Position3D = { x, y, z };
            const fadeZoneStart = -10;
            const fadeZoneEnd = -30;
            const isVisible = worldPos.z > fadeZoneEnd;
            let fadeOpacity = 1;
            if (worldPos.z <= fadeZoneStart) {
                fadeOpacity = Math.max(0, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
            }

            const distance = Math.sqrt(x * x + y * y);
            const distanceRatio = Math.min(distance / actualSphereRadius, 1);
            const centerScale = Math.max(0.3, 1 - distanceRatio * 0.7);
            const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
            const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

            return {
                ...worldPos,
                scale,
                zIndex: Math.round(1000 + z),
                isVisible,
                fadeOpacity,
                originalIndex: idx,
            } as WorldPosition;
        });
    }, [imagePositions, rotation, actualSphereRadius]);

    const clampRotationSpeed = useCallback((speed: number) =>
        Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed)),
        [maxRotationSpeed]
    );

    const updateMomentum = useCallback(() => {
        if (isDragging) return;
        setVelocity(prev => ({ x: prev.x * momentumDecay, y: prev.y * momentumDecay }));
        setRotation(prev => {
            let newY = prev.y;
            if (autoRotate) newY += autoRotateSpeed;
            newY += clampRotationSpeed(velocity.y);
            return {
                x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
                y: SPHERE_MATH.normalizeAngle(newY),
                z: prev.z,
            };
        });
    }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

    // Mouse / touch handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setVelocity({ x: 0, y: 0 });
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;
        const rotDelta = { x: -deltaY * dragSensitivity, y: deltaX * dragSensitivity };
        setRotation(prev => ({
            x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotDelta.x)),
            y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotDelta.y)),
            z: prev.z,
        }));
        setVelocity({ x: clampRotationSpeed(rotDelta.x), y: clampRotationSpeed(rotDelta.y) });
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, [isDragging, dragSensitivity, clampRotationSpeed]);

    const handleMouseUp = useCallback(() => setIsDragging(false), []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        setIsDragging(true);
        setVelocity({ x: 0, y: 0 });
        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastMousePos.current.x;
        const deltaY = touch.clientY - lastMousePos.current.y;
        const rotDelta = { x: -deltaY * dragSensitivity, y: deltaX * dragSensitivity };
        setRotation(prev => ({
            x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotDelta.x)),
            y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotDelta.y)),
            z: prev.z,
        }));
        setVelocity({ x: clampRotationSpeed(rotDelta.x), y: clampRotationSpeed(rotDelta.y) });
        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }, [isDragging, dragSensitivity, clampRotationSpeed]);

    const handleTouchEnd = useCallback(() => setIsDragging(false), []);

    // Effects
    useEffect(() => setIsMounted(true), []);
    useEffect(() => setImagePositions(generateSpherePositions()), [generateSpherePositions]);
    useEffect(() => {
        const animate = () => {
            updateMomentum();
            animationFrame.current = requestAnimationFrame(animate);
        };
        if (isMounted) animationFrame.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, [isMounted, updateMomentum]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

    const worldPositions = calculateWorldPositions();

    const renderImageNode = useCallback((image: ImageData, idx: number) => {
        const pos = worldPositions[idx];
        if (!pos || !pos.isVisible) return null;
        const size = baseImageSize * pos.scale;
        const isHover = hoveredIndex === idx;
        const finalScale = isHover ? Math.min(hoverScale, hoverScale / pos.scale) : 1;
        return (
            <div
                key={`${image.id}-${idx}`}
                className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${containerSize / 2 + pos.x}px`,
                    top: `${containerSize / 2 + pos.y}px`,
                    opacity: pos.fadeOpacity,
                    transform: `translate(-50%, -50%) scale(${finalScale})`,
                    zIndex: pos.zIndex,
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedImage(image)}
            >
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white/20 bg-white flex items-center justify-center">
                    {image.component ? (
                        <div className="w-full h-full p-2">{image.component}</div>
                    ) : (
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" draggable={false} loading={idx < 3 ? 'eager' : 'lazy'} />
                    )}
                </div>
            </div>
        );
    }, [worldPositions, baseImageSize, containerSize, hoveredIndex, hoverScale]);

    const renderSpotlightModal = () => {
        if (!selectedImage) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedImage(null)} style={{ animation: 'fadeIn 0.3s ease-out' }}>
                <div
                    className="bg-background/95 border border-border/50 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl transform transition-all"
                    onClick={e => e.stopPropagation()}
                    style={{ animation: 'scaleIn 0.3s ease-out' }}
                >
                    <div className="relative h-48 bg-muted/30 flex items-center justify-center border-b border-border/50">
                        {selectedImage.component ? (
                            <div className="w-32 h-32 transform hover:scale-110 transition-transform duration-500">{selectedImage.component}</div>
                        ) : (
                            <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-full object-cover" />
                        )}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-full text-foreground/70 hover:text-foreground transition-colors border border-border/50 shadow-sm"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">{selectedImage.title}</h3>
                            {selectedImage.tech && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {selectedImage.tech.map((t, i) => (
                                        <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {selectedImage.description && (
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {selectedImage.description}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            {selectedImage.web && (
                                <a
                                    href={selectedImage.web}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm text-sm"
                                >
                                    <LinkIcon className="w-4 h-4 mr-2" /> Live Demo
                                </a>
                            )}
                            {selectedImage.link && (
                                <a
                                    href={selectedImage.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors text-sm ${!selectedImage.web ? 'w-full' : ''}`}
                                >
                                    <LinkIcon className="w-4 h-4 mr-2" /> View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!isMounted) {
        return (
            <div className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    if (!images.length) {
        return (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>
                <div className="text-gray-400 text-center"><p>No images provided</p><p className="text-sm">Add images to the images prop</p></div>
            </div>
        );
    }

    return (
        <>
            <style>{`\n        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }\n        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }\n      `}</style>
            <div ref={containerRef} className={`relative select-none cursor-grab active:cursor-grabbing ${className}`} style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
                <div className="relative w-full h-full" style={{ zIndex: 10 }}>
                    {images.map((img, i) => renderImageNode(img, i))}
                </div>
            </div>
            {renderSpotlightModal()}
        </>
    );
};

export default SphereImageGrid;
