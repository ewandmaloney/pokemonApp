import { TestBed } from "@angular/core/testing";
import { HoverPokemonDirective } from "./hover-pokemon.directive";
import { Renderer2, RendererStyleFlags2 } from "@angular/core";


class MockElementRef {
    nativeElement = {};
}

class MockRenderer2 implements Renderer2 {
    get data(): { [key: string]: any; } {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }
    createElement(name: string, namespace?: string | null | undefined) {
        throw new Error("Method not implemented.");
    }
    createComment(value: string) {
        throw new Error("Method not implemented.");
    }
    createText(value: string) {
        throw new Error("Method not implemented.");
    }
    destroyNode!: ((node: any) => void) | null;
    appendChild(parent: any, newChild: any): void {
        throw new Error("Method not implemented.");
    }
    insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    removeChild(parent: any, oldChild: any, isHostElement?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    selectRootElement(selectorOrNode: any, preserveContent?: boolean | undefined) {
        throw new Error("Method not implemented.");
    }
    parentNode(node: any) {
        throw new Error("Method not implemented.");
    }
    nextSibling(node: any) {
        throw new Error("Method not implemented.");
    }
    setAttribute(el: any, name: string, value: string, namespace?: string | null | undefined): void {
        throw new Error("Method not implemented.");
    }
    removeAttribute(el: any, name: string, namespace?: string | null | undefined): void {
        throw new Error("Method not implemented.");
    }
    removeStyle(el: any, style: string, flags?: RendererStyleFlags2 | undefined): void {
        throw new Error("Method not implemented.");
    }
    setProperty(el: any, name: string, value: any): void {
        throw new Error("Method not implemented.");
    }
    setValue(node: any, value: string): void {
        throw new Error("Method not implemented.");
    }
    listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void {
        throw new Error("Method not implemented.");
    }
    addClass = jasmine.createSpy('addClass');
    removeClass = jasmine.createSpy('removeClass');
    setStyle = jasmine.createSpy('setStyle');
}

describe('HoverPokemonDirective', () => {


    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should create an instance', () => {
        const element = new MockElementRef();
        const renderer = new MockRenderer2();
        const directive = new HoverPokemonDirective(element, renderer);
        expect(directive).toBeTruthy();
    });


    it('should set background color on mouseenter', () => {
        const element = new MockElementRef();
        const renderer = new MockRenderer2();
        const directive = new HoverPokemonDirective(element, renderer);
        directive.color = 'fire';
        directive.onmouseenter({} as Event);
        expect(renderer.setStyle).toHaveBeenCalledWith(element.nativeElement, 'background-color', '#F08030');
    });

    it('should set background color to transparent on mouseleave', () => {
        const element = new MockElementRef()
        const renderer = new MockRenderer2()
        const directive = new HoverPokemonDirective(element, renderer);
        directive.onmouseleave({} as Event)
        expect(renderer.setStyle).toHaveBeenCalledWith(element.nativeElement, 'background-color', 'transparent')
    })

    it('color should be on colorMap', () => {
        const element = new MockElementRef()
        const renderer = new MockRenderer2()
        const directive = new HoverPokemonDirective(element, renderer);
        directive.color = 'fire'
        expect(directive.getColorMap()).toEqual(jasmine.objectContaining({ 'fire': jasmine.any(String) }));
    });

});