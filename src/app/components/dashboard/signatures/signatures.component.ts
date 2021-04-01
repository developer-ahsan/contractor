import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.css']
})
export class SignaturesComponent implements OnInit {
  @ViewChild(SignaturePad, {static: true}) signaturePad: SignaturePad;

  signatureImage: any; 
  signaturesList: any;
  signatureform = new FormData;
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  constructor(
    public api: ApiService,
    private spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.getSignature();
  }
  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear(); 
  }
  drawComplete() {
    this.signaturePad.set('minWidth', 5);
    const imageName = 'name.png';
    const imageBlob = this.DataURIToBlob(this.signaturePad.toDataURL());
    this.signatureImage = new File([imageBlob], imageName, { type: 'image/png' });
  }
  clearPad() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
        
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
      
        return new Blob([ia], { type: mimeString })
}
getSignature() {
  this.spinner.show();
  this.api.get('getSignature/'+localStorage.getItem('user_id')).subscribe((data) => {
    this.spinner.hide();
    if(data) {
      this.signaturesList = data.signatures;
    }
  }) 
}
delSignature(id) {
  this.spinner.show();
  this.api.get('delSignature/'+id).subscribe((data) => {
    this.spinner.hide();
    this.toast.success('Deleted','' ,{
      timeOut: 1000
    });
    this.getSignature();
  }) 
}
  addSignature()
  {
    this.spinner.show();
    this.signaturePad.clear(); 
    this.signatureform.append('file', this.signatureImage);
    this.signatureform.append('user_id', localStorage.getItem('user_id'));
    this.api.post('addSignature', this.signatureform).subscribe((data) => {
      this.spinner.hide();
      this.toast.success('Successfully Added','' ,{
        timeOut: 1000
      });
      this.getSignature();
      // window.open(this.api.imageUrl +  data.file)
    })      
  }
}
