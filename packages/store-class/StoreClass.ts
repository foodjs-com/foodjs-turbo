import type { Writable } from 'svelte/store';

function safe_not_equal(a: any, b: any): boolean {
    return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

export class StoreClass<T>
    implements Writable<T>
{
    _subscribers: Set<(value: T) => void> = new Set();
    [key: string]: T | any;

    constructor() {
        Promise.resolve().then(() => this.reRenderer());
    }

    subscribe(run: (value: T) => void): () => void {
        this._subscribers.add(run);
        run(this as unknown as T);
        return () => {
            this._subscribers.delete(run);
        };
    }

    set(value: T): void {
        if (safe_not_equal(this as unknown as T, value)) {
            Object.assign(this, value);
            this.reRenderer();
        }
    }

    update(fn: (value: T) => T): void {
        this.set(fn(this as unknown as T));
    }

    reRenderer(): void {
        // this._makePropertiesObservable();
        this._subscribers.forEach(subscriber => subscriber(this as unknown as T));
    }

    // shouldSerialize(key: string, value: unknown): boolean {
    //     return typeof value !== 'function' &&
    //         ![ // not serialize these keys
    //             '_subscribers'
    //         ].includes(key);
    // }

    // serialize(): { [key: string]: T } {
    //     const serialized: { [key: string]: T } = {};
    //     for (const [key, value] of Object.entries(this)) {
    //         if (this.shouldSerialize(key, value)) {
    //             serialized[key] = value as T;
    //         }
    //     }
    //     return JSON.parse(safeStringify(serialized));
    // }

    // function safeStringify(obj: any): string {
    //     const cache = new Set();
    //     return JSON.stringify(obj, (key, value) => {
    //         if (typeof value === 'object' && value !== null) {
    //             if (cache.has(value)) {
    //                 // Duplicate reference found, discard key
    //                 return;
    //             }
    //             // Store value in our set
    //             cache.add(value);
    //         }
    //         return value;
    //     });
    // }

    // auto make properties observable
    // _makePropertiesObservable(obj = this): void {
    //     for (const key of Object.keys(obj)) {
    //         if (!this.shouldSerialize(key, obj[key])) {
    //             continue;
    //         }
    //         let _value = obj[key];
    //         if (_value && typeof _value === 'object') {
    //             this._makePropertiesObservable(_value);
    //         }
    //         const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    //         if (descriptor && (descriptor.get || descriptor.set)) {
    //             continue;
    //         } else {
    //             Object.defineProperty(obj, key, {
    //                 get: () => _value,
    //                 set: (value) => {
    //                     if (safe_not_equal(_value, value)) {
    //                         _value = value;
    //                         // Disable auto make properties observable, use reRenderer for new array items and objects...
    //                         // if (typeof value === 'object') {
    //                         //     this._makePropertiesObservable();
    //                         // }
    //                         this.reRenderer();
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // }
}