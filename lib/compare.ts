"use strict";

import { XMLSerializer, DOMImplementation, DOMParser } from "xmldom";
import { MSEdgeIgnore, IDLSnippetContent } from "./types.js";
import * as mz from "mz/fs";

run();

async function run() {
    const msedgeDocument = new DOMParser().parseFromString(await mz.readFile("supplements/browser.webidl.xml", "utf8"), "text/xml");
    const standardDocument = JSON.parse(await mz.readFile("built/browser.webidl.json", "utf8")) as IDLSnippetContent;
    const ignore = JSON.parse(await mz.readFile("msedge-ignore.json", "utf8")) as MSEdgeIgnore;;

    compareArray(extractInterfaceNamesOnEdgeXML(msedgeDocument), extractInterfaceNamesOnIDLSnippetContent(standardDocument), ignore.interfaces);
}

function extractInterfaceNamesOnEdgeXML(doc: Document) {
    const callbackInterfaces = doc.getElementsByTagName("callback-interfaces")[0];
    const interfaces = doc.getElementsByTagName("interfaces")[0];
    const mixinInterfaces = doc.getElementsByTagName("mixin-interfaces")[0];

    return [
        ...getChildrenArray(callbackInterfaces),
        ...getChildrenArray(interfaces)
    ].filter(interfaceEl => interfaceEl.getAttribute("tags") !== "MSAppOnly").map(interfaceEl => interfaceEl.getAttribute("name")!);
}

function extractInterfaceNamesOnIDLSnippetContent(doc: IDLSnippetContent) {
    return [
        ...doc.callbackInterfaces,
        ...doc.interfaces
    ].map(definition => definition.name);
}

function compareArray(base: string[], comparand: string[], ignore: string[]) {
    for (const item of ignore) {
        if (!base.includes(item)) {
            console.log(`${item} is already removed in base xml or filtered out by MSAppOnly tag.`);
        }
    }
    // naive algorithm
    let count = 0;
    for (const item of base) {
        if (!comparand.includes(item)) {
            if (ignore.includes(item)) {
                // ignore
                continue;
            }
            count++;
            console.warn(`${item} is not found in comparand.`)
        }
    }
    if (count !== 0) {
        console.warn(`Total: ${count} unmatched.`)
    }
}

function getChildrenArray(element: Element) {
    // xmldom does not support element.children
    return Array.from(element.childNodes).filter(node => node.nodeType === 1) as Element[];
}