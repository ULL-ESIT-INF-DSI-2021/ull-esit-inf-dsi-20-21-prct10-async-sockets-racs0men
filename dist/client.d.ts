/// <reference types="node" />
import EventEmitter from "events";
import * as net from 'net';
import { RequestType } from "./types";
export declare class client extends EventEmitter {
    puerto: number;
    constructor(puerto: number);
    run(client: net.Socket): void;
    request(req: RequestType): void;
}
