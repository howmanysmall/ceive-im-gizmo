interface Styles extends WritableInstanceProperties<WireframeHandleAdornment> {
	AlwaysOnTop: boolean;
	Color3: Color3;
	Transparency: number;
}

interface GizmoPropertyTable {
	AlwaysOnTop: boolean;
	Color3: Color3;
	Destroy: boolean;
	Enabled: boolean;
	Transparency: number;
}

declare namespace Ceive {
	export interface Drawable<TDrawArgs extends ReadonlyArray<unknown> = ReadonlyArray<unknown>> {
		Draw(...parameters: TDrawArgs): void;
		Create(...parameters: TDrawArgs): GizmoPropertyTable;
	}
	export type GetArgumentsFromDrawable<T extends Drawable> = T extends Drawable<infer U> ? U : never;

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
	}

	export const Arrow: Drawable<
		[origin: Vector3, finish: Vector3, radius: number, length: number, subdivisions: number]
	>;
	export const Box: Drawable<[transform: CFrame, size: Vector3, drawTriangles: boolean]>;
	export const Capsule: Drawable<[transform: CFrame, radius: number, length: number, subdivisions: number]>;
	export const CFrame: Drawable<[transform: CFrame, scale: number]>;
	export const Circle: Drawable<
		[transform: CFrame, radius: number, subdivisions: number, angle: number, connectToStart?: boolean]
	>;
	export const Cone: Drawable<[transform: CFrame, radius: number, length: number, subdivisions: number]>;
	export const Cylinder: Drawable<[transform: CFrame, radius: number, length: number, subdivisions: number]>;
	export const Line: Drawable<[transform: CFrame, length: number]>;
	export const Mesh: Drawable<[transform: CFrame, size: Vector3, vertices: ObjectMesh["v"], faces: ObjectMesh["f"]]>;
	export const Plane: Drawable<[position: Vector3, normal: Vector3, size: Vector3]>;
	export const Ray: Drawable<[origin: Vector3, finish: Vector3]>;
	export const RoundedFrustum: Drawable<[transform: CFrame, radius0: number, radius1: number, length: number, subdivisions: number]>;
	export const Sphere: Drawable<[transform: CFrame, radius: number, subdivisions: number, angle: number]>;
	export const Text: Drawable<[origin: Vector3, text: string, size?: number]>;
	export const VolumeArrow: Drawable<
		[
			origin: Vector3,
			finish: Vector3,
			cylinderRadius: number,
			coneRadius: number,
			length: number,
			useCylinder?: boolean,
		]
	>;
	export const VolumeBox: Drawable<[transform: CFrame, size: Vector3]>;
	export const VolumeCone: Drawable<[transform: CFrame, radius: number, length: number]>;
	export const VolumeCylinder: Drawable<
		[transform: CFrame, radius: number, length: number, innerRadius?: number, angle?: number]
	>;
	export const VolumeSphere: Drawable<[transform: CFrame, radius: number]>;
	export const Wedge: Drawable<[transform: CFrame, size: Vector3, drawTriangles: boolean]>;

	export const ActiveRays: number;
	export const ActiveInstances: number;
	export let Enabled: boolean;

	export const Styles: {
		readonly Color: "Color3";
		readonly Transparency: "Transparency";
		readonly AlwaysOnTop: "AlwaysOnTop";
	};

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

	export function RemoveAdornments(): void;

	// TODO: better types than this junk
	export function TweenProperties(
		properties: Record<string, unknown>,
		goal: Record<string, unknown>,
		tweenInfo: TweenInfo,
	): () => void;
}

export = Ceive;
