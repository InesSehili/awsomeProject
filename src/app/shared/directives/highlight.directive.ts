import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector : '[highlight]'
})
export class HighlightDirective implements AfterViewInit{
  @Input() color = 'yellow';
  constructor( private el : ElementRef, private renerer : Renderer2 )
          {}

  setBackgroundColor(color : string)
  {
    this.renerer.setStyle(this.el.nativeElement, 'background-color' , color);
  }

  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color);
  }
  @HostListener('mouseenter') onMouseEnter (){
    this.setBackgroundColor('lightgreen');
}

  @HostListener('click') onClick() {
    this.setBackgroundColor("blue");
    console.log("t'a clické");
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.setBackgroundColor('orange');
  }
}
