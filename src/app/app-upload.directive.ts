import { Directive, EventEmitter, HostBinding, HostListener, Output, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {
  @Output() onFileDropped = new EventEmitter<FileList>();

  @HostBinding('style.background-color') private background = '#f9f9f9';
  @HostBinding('style.opacity') private opacity = '1';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#e3e3e3';
    this.opacity = '0.8';
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f9f9f9';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event']) onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f9f9f9';
    this.opacity = '1';

    if (evt.dataTransfer && evt.dataTransfer.files.length > 0) {
      const file = evt.dataTransfer.files[0];
      this.onFileDropped.emit(evt.dataTransfer.files);
      this.previewFile(file);
    }
  }

  private previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', e.target.result);
      this.renderer.setStyle(img, 'max-width', '200px');
      this.renderer.setStyle(img, 'max-height', '100px');
      this.renderer.setStyle(img, 'display', 'block');
      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'top', '5px');
      this.renderer.appendChild(this.el.nativeElement, img);
    };
    reader.readAsDataURL(file);
  }
}

