# CeiveImGizmo Usage Guide

CeiveImGizmo is a high-performance 3D wireframe rendering library for Roblox. It provides both immediate and retained mode rendering for various geometric shapes.

## Installation

### Using Wally
```toml
[dependencies]
imgizmo = "jakeywastaken/imgizmo@^3.6.0"
```

### Manual Installation
1. Download the latest release
2. Place the module in your project
3. Require it in your scripts

## TypeScript Setup

```typescript
import Ceive from "path/to/ceive-im-gizmo";
```

## Getting Started

### Basic Setup
```typescript
// Initialize the library
Ceive.Init();

// Set global style
Ceive.SetStyle(Color3.fromRGB(255, 0, 0), 0.5, true);
```

### Simple Drawing
```typescript
const origin = new Vector3(0, 10, 0);
const endPoint = new Vector3(10, 10, 10);

// Draw a simple ray
Ceive.Ray.Draw(origin, endPoint);

// Draw a box
const transform = new CFrame(0, 5, 0);
const size = new Vector3(4, 4, 4);
Ceive.Box.Draw(transform, size, true);
```

## Available Gizmos

### Basic Shapes

#### Ray
```typescript
Ceive.Ray.Draw(origin: Vector3, finish: Vector3);
```

#### Line
```typescript
Ceive.Line.Draw(transform: CFrame, length: number);
```

#### Box
```typescript
Ceive.Box.Draw(transform: CFrame, size: Vector3, drawTriangles: boolean);
```

#### Sphere
```typescript
Ceive.Sphere.Draw(transform: CFrame, radius: number, subdivisions: number, angle: number);
```

#### Cylinder
```typescript
Ceive.Cylinder.Draw(transform: CFrame, radius: number, length: number, subdivisions: number);
```

#### Cone
```typescript
Ceive.Cone.Draw(transform: CFrame, radius: number, length: number, subdivisions: number);
```

#### Capsule
```typescript
Ceive.Capsule.Draw(transform: CFrame, radius: number, length: number, subdivisions: number);
```

### Advanced Shapes

#### Arrow
```typescript
Ceive.Arrow.Draw(origin: Vector3, finish: Vector3, radius: number, length: number, subdivisions: number);
```

#### Circle
```typescript
Ceive.Circle.Draw(transform: CFrame, radius: number, subdivisions: number, angle: number, connectToStart?: boolean);
```

#### Plane
```typescript
Ceive.Plane.Draw(position: Vector3, normal: Vector3, size: Vector3);
```

#### Wedge
```typescript
Ceive.Wedge.Draw(transform: CFrame, size: Vector3, drawTriangles: boolean);
```

#### Custom Mesh
```typescript
const vertices = [
    { x: 0, y: 0, z: 0, w: 1 },
    { x: 1, y: 0, z: 0, w: 1 },
    { x: 0, y: 1, z: 0, w: 1 }
];
const faces = [
    [{ v: 1 }, { v: 2 }, { v: 3 }]
];
Ceive.Mesh.Draw(transform, size, vertices, faces);
```

#### CFrame Axes
```typescript
// Draws colored axis arrows (red=right, green=up, blue=forward)
Ceive.CFrame.Draw(transform: CFrame, scale: number);
```

#### RoundedFrustum
```typescript
// Draws a capsule-like shape with different end radii
Ceive.RoundedFrustum.Draw(transform: CFrame, radius0: number, radius1: number, length: number, subdivisions: number);
```

### Volume Shapes (Solid Adornments)

#### VolumeBox
```typescript
Ceive.VolumeBox.Draw(transform: CFrame, size: Vector3);
```

#### VolumeSphere
```typescript
Ceive.VolumeSphere.Draw(transform: CFrame, radius: number);
```

#### VolumeCone
```typescript
Ceive.VolumeCone.Draw(transform: CFrame, radius: number, length: number);
```

#### VolumeCylinder
```typescript
Ceive.VolumeCylinder.Draw(transform: CFrame, radius: number, length: number, innerRadius?: number, angle?: number);
```

#### VolumeArrow
```typescript
Ceive.VolumeArrow.Draw(origin: Vector3, finish: Vector3, cylinderRadius: number, coneRadius: number, length: number, useCylinder?: boolean);
```

### Text
```typescript
Ceive.Text.Draw(origin: Vector3, text: string, size?: number);
```

## Styling and Properties

### Global Style Management
```typescript
// Set color, transparency, and always-on-top
Ceive.SetStyle(Color3.fromRGB(255, 0, 0), 0.2, true);

// Push/Pop properties for temporary changes
Ceive.PushProperty("Color3", Color3.fromRGB(0, 255, 0));
// ... draw something green
const previousColor = Ceive.PopProperty("Color3");
```

### Available Style Properties
```typescript
// Access style constants
const colorKey = Ceive.Styles.Color;        // "Color3"
const transparencyKey = Ceive.Styles.Transparency; // "Transparency"
const alwaysOnTopKey = Ceive.Styles.AlwaysOnTop;   // "AlwaysOnTop"
```

## Retained Mode (Persistent Gizmos)

### Creating Persistent Gizmos
```typescript
// Create a persistent arrow that can be updated
const arrowProps = Ceive.Arrow.Create(origin, endPoint, 0.5, 1, 8);

// Modify properties
arrowProps.Color3 = Color3.fromRGB(0, 255, 0);
arrowProps.Transparency = 0.3;
arrowProps.Enabled = true;

// To remove it
arrowProps.Destroy = true;
```

### Property Animation
```typescript
// Tween properties over time
const cancelTween = Ceive.TweenProperties(
    arrowProps,                    // Source properties
    { Transparency: 1 },           // Target properties
    new TweenInfo(2)              // Tween duration
);

// Cancel the tween if needed
cancelTween();
```

## Lifecycle Management

### Performance Monitoring
```typescript
// Check active object counts
const rayCount = Ceive.ActiveRays;
const instanceCount = Ceive.ActiveInstances;
const poolSize = Ceive.GetPoolSize();
```

### Cleanup
```typescript
// Manual cleanup
Ceive.DoCleaning();

// Schedule cleanup for next frame
Ceive.ScheduleCleaning();

// Enable/disable all rendering
Ceive.SetEnabled(false);

// Remove adornments (will be recreated next frame if enabled)
Ceive.RemoveAdornments();
```

## Advanced Features

### Debris Management
```typescript
// Run code for a specific duration
Ceive.AddDebrisInSeconds(5, () => {
    Ceive.Sphere.Draw(transform, 2, 16, 360);
});

// Run code for a specific number of frames
Ceive.AddDebrisInFrames(120, () => {
    Ceive.Box.Draw(transform, size, true);
});
```

## Performance Tips

1. **High Performance**: The library can render up to 100,000 lines at 20fps
2. **No Performance Difference**: Retained mode internally calls immediate mode functions
3. **Automatic Cleanup**: Objects are automatically managed and cleaned up
4. **Object Pooling**: Internal object pooling minimizes garbage collection

## Example: Animated Rotating Cube

```typescript
import Ceive from "path/to/ceive-im-gizmo";

// Initialize
Ceive.Init();
Ceive.SetStyle(Color3.fromRGB(0, 150, 255), 0, true);

// Animation loop
let rotation = 0;
const size = new Vector3(4, 4, 4);

Ceive.AddDebrisInFrames(600, () => { // Run for 10 seconds at 60fps
    rotation += 2;
    const transform = new CFrame(0, 10, 0) * CFrame.Angles(
        math.rad(rotation),
        math.rad(rotation * 0.7),
        math.rad(rotation * 0.3)
    );
    
    Ceive.Box.Draw(transform, size, true);
});
```

## Common Patterns

### Multi-colored Visualization
```typescript
// Save current color
const originalColor = Ceive.PopProperty("Color3");

// Draw different parts in different colors
Ceive.PushProperty("Color3", Color3.fromRGB(255, 0, 0));
Ceive.Box.Draw(transform1, size, true);

Ceive.PushProperty("Color3", Color3.fromRGB(0, 255, 0));
Ceive.Sphere.Draw(transform2, 2, 16, 360);

// Restore original color
Ceive.PushProperty("Color3", originalColor);
```

### Debug Coordinate System
```typescript
function drawCoordinateSystem(transform: CFrame, scale: number = 5) {
    Ceive.CFrame.Draw(transform, scale);
}

// Usage
drawCoordinateSystem(new CFrame(0, 10, 0), 3);
```

This covers the complete API and common usage patterns for CeiveImGizmo. The library provides a clean, type-safe interface for 3D wireframe rendering in Roblox applications.