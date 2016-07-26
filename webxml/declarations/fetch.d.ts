declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;

declare type HeadersInit = Headers | string[][] | { [key: string]: string };
interface Headers {
	append(name: string, value: string): void;
	delete(name: string): void;
	get(name: string): string;
	getAll(name: string): string[];
	has(name: string): boolean;
	set(name: string, value: string): void;
	// iterable
    [Symbol.iterator](): IterableIterator<string>;
}
interface HeadersConstructor {
	new (init?: HeadersInit): Headers;
}
declare var Headers: HeadersConstructor;

declare type BodyInit = Blob | ArrayBufferView | ArrayBuffer | FormData /* | URLSearchParams */ | string;
interface Body {
	bodyUsed: boolean;
	arrayBuffer(): Promise<ArrayBuffer>;
	blob(): Promise<Blob>;
	formData(): Promise<FormData>;
	json(): Promise<any>;
	text(): Promise<string>;
}

declare type RequestInfo = Request | string;
interface Request extends Body {
	method: string;
	url: string;
	headers: Headers;
	
    type: "" | "audio" | "font" | "image" | "script" | "style" | "track" | "video";
    destination: "" | "document" | "embed" | "font" | "image" | "manifest" | "media" | "object" | "report" | "script" | "sharedworker" | "sharedworker" | "style" | "worker" | "xslt";
	referrer: string;
    referrerPolicy: ReferrerPolicy;
    mode: RequestMode;
    credentials: RequestCredentials;
    cache: RequestCache;
    redirect: RequestRedirect;
	integrity: string;
	
	clone(): Request;
}
interface RequestInit {
	method?: string;
	headers?: HeadersInit;
	body?: BodyInit;
	referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
	integrity?: string;
	window?: any;
}
interface RequestConstructor {
	new (input: RequestInfo, init?: RequestInit): Request;
}
declare var Request: RequestConstructor;

type RequestMode = "same-origin" | "no-cors" | "cors";
type RequestCredentials = "omit" | "same-origin" | "include";
type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache";
type RequestRedirect = "follow" | "error" | "manual";
type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";

interface Response extends Body {
    type: "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
	url: string;
	status: number;
	ok: boolean;
	statusText: string;
	headers: Headers;
	
	clone(): Response;
}
interface ResponseInit {
	status?: number;
	statusText?: number;
	headers?: HeadersInit;
}
interface ResponseConstructor {
	new (body?: BodyInit, init?: ResponseInit): Response;
	
	error(): Response;
	redirect(url: string, status?: number): Response;
}
declare var Response: ResponseConstructor;
