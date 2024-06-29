// scanner.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-scanner',
  standalone: true,
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class AppComponent {
  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  @ViewChild('cropperImage') cropperImage!: ElementRef;

  cropper!: Cropper;
  imageSrc: string = '';
  scannedImage: string = '';

  ngOnInit() {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
      })
      .catch(err => console.error('Error accessing camera: ', err));
  }

  captureImage() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.imageSrc = canvas.toDataURL('image/png');
    this.initCropper();
  }

  initCropper() {
    this.cropper = new Cropper(this.cropperImage.nativeElement, {
      aspectRatio: 1,
      viewMode: 1,
      autoCrop: true,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.scannedImage = canvas.toDataURL('image/png');
      }
    });
  }

  downloadImage() {
    const link = document.createElement('a');
    link.href = this.scannedImage;
    link.download = 'scanned-image.png';
    link.click();
  }
}