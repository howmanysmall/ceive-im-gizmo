/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Ceive {
	interface Styles extends WritableInstanceProperties<WireframeHandleAdornment> {
		AlwaysOnTop: boolean;
		Color3: Color3;
		Transparency: number;
	}

	type BoxFunction = (transform: CFrame, size: Vector3, drawTriangles: boolean) => void;
	type Shape3dFunction = (transform: CFrame, radius: number, length: number, subdivisions: number) => void;

	interface Drawable<Signature extends (...args: any) => any = () => void> {
		Draw(...drawParameters: Parameters<Signature>): void;
	}

	export interface ObjectMesh {
		/**
		 * Faces of the mesh.
		 */
		readonly f: ReadonlyArray<ReadonlyArray<{ readonly v: number }>>;

		/**
		 * Vertices of the mesh.
		 */
		readonly v: ReadonlyArray<{
			readonly w: number;
			readonly x: number;
			readonly y: number;
			readonly z: number;
		}>;

		readonly vn?: object;
		readonly vp?: object;
		readonly vt?: object;
	}

	export const Arrow: Drawable<
		(origin: Vector3, finish: Vector3, radius: number, length: number, subdivisions: number) => void
	>;
	export const Box: Drawable<BoxFunction>;
	export const Capsule: Drawable<Shape3dFunction>;
	export const Circle: Drawable<
		(transform: CFrame, radius: number, subdivisions: number, connectToStart?: boolean) => void
	>;
	export const Cone: Drawable<Shape3dFunction>;
	export const Cylinder: Drawable<Shape3dFunction>;
	export const Line: Drawable<(transform: CFrame, length: number) => void>;
	export const Mesh: Drawable<
		(transform: CFrame, size: Vector3, vertices: ObjectMesh["v"], faces: ObjectMesh["f"]) => void
	>;
	export const Plane: Drawable<(position: Vector3, normal: Vector3, size: Vector3) => void>;
	export const Ray: Drawable<(origin: Vector3, finish: Vector3) => void>;
	export const Sphere: Drawable<(transform: CFrame, radius: number, subdivisions: number, angle: number) => void>;
	export const VolumeArrow: Drawable<
		(
			origin: Vector3,
			finish: Vector3,
			cylinderRadius: number,
			coneRadius: number,
			length: number,
			useCylinder?: boolean,
		) => void
	>;
	export const VolumeBox: Drawable<(transform: CFrame, size: Vector3) => void>;
	export const VolumeCone: Drawable<(transform: CFrame, radius: number, length: number) => void>;
	export const VolumeCylinder: Drawable<
		(transform: CFrame, radius: number, length: number, innerRadius?: number, angle?: number) => void
	>;
	export const VolumeSphere: Drawable<(transform: CFrame, radius: number) => void>;
	export const Wedge: Drawable<BoxFunction>;

	export const ActiveRays: number;
	export const ActiveInstances: number;

	export function GetPoolSize(): number;

	export function PushProperty<T extends keyof Styles>(property: T, value: Styles[T]): void;
	export function PopProperty<T extends keyof Styles>(property: T): Styles[T];

	export function SetStyle(color?: Color3, transparency?: number, alwaysOnTop?: boolean): void;

	export function AddDebrisInSeconds(seconds: number, callback: () => void): void;
	export function AddDebrisInFrames(frames: number, callback: () => void): void;

	export function SetEnabled(enabled: boolean): void;

	export function DoCleaning(): void;
	export function ScheduleCleaning(): void;

	export function Init(): void;
}

export = Ceive;
