import { useEffect, useRef } from 'react';
import type * as ThreeTypes from 'three';

type ThreeModule = typeof import('three');

function seededRandom(seedValue: number) {
  let seed = seedValue;

  return () => {
    const value = Math.sin(seed) * 10000;
    seed += 1;
    return value - Math.floor(value);
  };
}

function disposeScene(scene: ThreeTypes.Scene) {
  scene.traverse((object) => {
    const disposable = object as ThreeTypes.Object3D & {
      geometry?: ThreeTypes.BufferGeometry;
      material?: ThreeTypes.Material | ThreeTypes.Material[];
    };

    disposable.geometry?.dispose();

    if (Array.isArray(disposable.material)) {
      disposable.material.forEach((material) => material.dispose());
    } else {
      disposable.material?.dispose();
    }
  });
}

function createStarField(THREE: ThreeModule, count: number, radius: number, seed: number, size: number, opacity: number) {
  const random = seededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color(0xf4efe7);
  const colorB = new THREE.Color(0x69d8ff);
  const colorC = new THREE.Color(0xd1b487);

  for (let index = 0; index < count; index += 1) {
    const cursor = index * 3;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const distance = radius * (0.28 + random() * 0.72);
    const twinkle = 0.55 + random() * 0.45;
    const chosen = random() > 0.82 ? colorB : random() > 0.72 ? colorC : colorA;

    positions[cursor] = distance * Math.sin(phi) * Math.cos(theta);
    positions[cursor + 1] = distance * Math.sin(phi) * Math.sin(theta);
    positions[cursor + 2] = -Math.abs(distance * Math.cos(phi)) - 1.5;

    colors[cursor] = chosen.r * twinkle;
    colors[cursor + 1] = chosen.g * twinkle;
    colors[cursor + 2] = chosen.b * twinkle;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size,
    transparent: true,
    opacity,
    vertexColors: true,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

function mountThreeScene(THREE: ThreeModule, canvas: HTMLCanvasElement) {
  let renderer: ThreeTypes.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch {
    canvas.dataset.webgl = 'unavailable';
    return undefined;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 120);
  const starStage = new THREE.Group();
  const nearStars = createStarField(THREE, 900, 18, 17, 0.04, 0.92);
  const farStars = createStarField(THREE, 1500, 36, 43, 0.024, 0.68);
  const pointerTarget = new THREE.Vector2(0, 0);
  const pointerCurrent = new THREE.Vector2(0, 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  camera.position.set(0, 0, 8.5);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x030405, 0);

  starStage.add(farStars, nearStars);
  scene.add(starStage);

  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(width, height, false);
  };

  const handlePointerMove = (event: PointerEvent) => {
    pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  let animationFrame = 0;

  const render = () => {
    pointerCurrent.lerp(pointerTarget, 0.035);
    starStage.rotation.y = pointerCurrent.x * 0.045;
    starStage.rotation.x = pointerCurrent.y * 0.028;

    if (!prefersReducedMotion) {
      farStars.rotation.z += 0.00008;
      nearStars.rotation.z -= 0.00013;
      nearStars.rotation.y += 0.00007;
    }

    renderer.render(scene, camera);

    if (!prefersReducedMotion) {
      animationFrame = window.requestAnimationFrame(render);
    }
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  render();

  return () => {
    window.cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', handlePointerMove);
    disposeScene(scene);
    renderer.dispose();
  };
}

export function GlobalThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    let isDisposed = false;
    let cleanupScene: (() => void) | undefined;

    void import('three')
      .then((THREE) => {
        if (isDisposed) {
          return;
        }

        cleanupScene = mountThreeScene(THREE, canvas);
      })
      .catch(() => {
        if (!isDisposed) {
          canvas.dataset.webgl = 'unavailable';
        }
      });

    return () => {
      isDisposed = true;
      cleanupScene?.();
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" data-layer="global-star-background" />;
}
