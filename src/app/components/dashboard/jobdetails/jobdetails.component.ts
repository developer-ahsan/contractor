import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxImageCompressService } from 'ngx-image-compress';
// import * as jspdf from 'jspdf';  
// import html2canvas from 'html2canvas'; 
import heic2any from "heic2any";

declare var jsPDF: any; 
declare var html2canvas: any;
declare var Sharer: any;
declare var $;

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.css'],
  providers: [NgxImageCompressService]
})
export class JobdetailsComponent implements OnInit {
  sharelink: string;
  id: any;
  jobsList: any;
  isAdmin = localStorage.getItem('isAdmin');
  startImages: any = [];
  CompleteImages: any = [];
  files: File[] = [];
  photos = [];
  formData = new FormData;
  ngnotes: any;
  emailBody: any;
  emailBody1: any;
  emailBody3: any;
  hideDisplay = false;
  emailBody4: string;
  emailBody5: string;
  emailBody6: string;
  constructor(
    public api: ApiService,
    private spinner: NgxSpinnerService,
    public toast: ToastrService,
    private valueActive: ActivatedRoute,
    public router: Router,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() {
    this.emailBody = 'Hi'
    this.id =   this.valueActive.snapshot.params.type;
    if(this.valueActive.snapshot.params.toast) {
      this.toast.success('Job Accepted and Signed Successfully.');
    }
    this.getJobById();
    // this.getsharefile();
  }
  padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }
  getsharefile() {
    const params = {
      emp: localStorage.getItem('user_id'),
      job: this.id
    }
    this.api.get('getsharefile', params).subscribe((data) => {
      if (data.file) {
        this.sharelink = data.file;
      }
    });
  }
  getJobById() {
    this.spinner.show();
    this.api.get('getjobs/' + this.id, {}).subscribe((data) => {
      console.log(data)
      this.jobsList = data.jobs;
      this.startImages = data.start_images;
      this.CompleteImages = data.complete_images;
      this.spinner.hide();
      Sharer.init();
    });
  }
  onSelect(event) {
    this.files.push(...event.addedFiles);
    console.log(event);
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onUpload(status) {
    this.spinner.show();
    if (this.files.length < 1 || this.files.length > 15) {
      this.spinner.hide();
      this.toast.warning('Images should be between 1 and 15')
    } else {
      for (let i = 0; i < this.files.length; i++) {
        this.formData.append('photos[]', this.files[i]);
        if (i == this.files.length - 1) {
          this.Upload(status);
        }
      }
    }
  }
  uploadImage(event, status) {
    let f:File;

  //RECEIVE IMAGE

  if (event[0] && (event[0]['lastModified'] || event[0]['lastModifiedDate'])) {
    this.spinner.show()
    f = event[0];
    if (event.length > 1) {
      event.splice(0,event.length-1);
      f = event[0];
    }
  } else if (event.target && event.target.files && event.target.files[0]) {
    f = event.target.files[0];
    this.spinner.show()
  }

  if (!f) {
    //Handle error and exit
  }

  let blob:Blob = f;
  let file:File = f;
  let convProm:Promise<any>;
  
  //CONVERT HEIC TO JPG

  if (f.type != 'image/jpeg' && f.type != 'image/png' && f.type != 'image/jpg') {
    console.log('here');
    convProm = heic2any({blob,toType:"image/jpeg",quality:0}).then((jpgBlob:Blob) => {
      //Change the name of the file according to the new format
      let newName = f.name.replace(/\.[^/.]+$/, ".jpg");
      const reader = new FileReader();
      const file = jpgBlob;
      console.log(jpgBlob)
      reader.readAsDataURL(file);
      reader.onload = () => {
        let image = String(reader.result);
        this.imageCompress.compressFile(image, -1, 35, 35).then(
              result => {
                console.log(result);
                const file = this.DataURIToBlob(result)
                if(file) {
                  this.formData.append('photos', file);
                  this.Upload(status);
                }
              })
      };
    }).catch(err => {
      //Handle error
    });
  } else {
    const reader = new FileReader();
      const file = blob;
      reader.readAsDataURL(file);
      reader.onload = () => {
        let image = String(reader.result);
        this.imageCompress.compressFile(image, -1, 35, 35).then(
              result => {
                const file = this.DataURIToBlob(result)
                if(file) {
                  this.formData.append('photos', file);
                  this.Upload(status);
                }
              })
      };
    convProm = Promise.resolve(true);
  }
    // this.spinner.show();
    // const reader = new FileReader();
    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     console.log(reader.result);
        
    //     let image = String(reader.result);
    //     this.imageCompress.compressFile(image, -1, 20, 20).then(
    //           result => {
    //         console.log(result)
    //           })
    //   };
    // }
  }
  Upload(status) {
    this.formData.append('job_id', this.id);
    this.formData.append('status', status);
    this.api.post('uploadImageByJobId', this.formData).subscribe((data) => {
      this.spinner.hide();
      this.getJobById();
      console.log(data);
      this.formData = new FormData();
      this.files = [];
    });
  }
  compressFile(status) {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      console.log(image)
      // if(image) {
      //   this.spinner.show();
      //   console.warn('Size in bytes was:', this.imageCompress.byteCount(image));      
      //   this.imageCompress.compressFile(image, orientation, 20, 20).then(
      //     result => {
      //   console.log(result)

      //   const file = this.DataURIToBlob(result)
      //   if(file) {
      //     this.formData.append('photos', file);
      //     this.Upload(status);
      //   }
      //   console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
      //   });
      // }
    });
    
  }
  deleteImage(id) {
    this.api.get('deleteImageByJobId/'+id).subscribe((data) => {
      this.spinner.hide();
      this.getJobById();
      this.formData = new FormData();
      this.files = [];
    });
  }
  ChangeJobStatus() {
    const params = {
      id: this.id,
      status: 'accepted'
    };
    this.api.post('updateStatusByJobId', params).subscribe((res: any) => {
      this.toast.success(res.msg,'' ,{
        timeOut: 1000
      });
      this.getJobById();
    });
  }
  AddSignature() {
    const link = this.jobsList.swms_forms[0].form_link;
    this.router.navigate(['/dashboard/accept&sign/'+this.id+'/'+link]);
    // const params = {
    //   job: this.id,
    //   userid: localStorage.getItem('user_id')
    // };
    // this.api.post('createPDF', params).subscribe((data) => {
    //   this.toast.success('Successfully Updated');
    //   this.getJobById();
    //   window.open(this.api.imageUrl +  data.file)
    // })
  }
  openEamil() {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su='+'JOB_ID('+this.padLeft(this.id, '0', 5)+'), Job Address ('+this.jobsList.client_address+')&body=%0aHi there,%0a'+ '%0a'  +
    'We would like to inform you the following job is now completed. Please click on the links below to view the relevant information.%0a'+ '%0a'  +
    this.emailBody3 + '%0a' + this.emailBody + '%0a'+ this.emailBody1 + '%0a' + '%0a'  + this.emailBody5 + '%0a' + this.emailBody6, '_blank');
  }
  JobCompleted() {
    // this.spinner.show();
    const params = {
      id: this.id,
      emp: localStorage.getItem('user_id'),
      notes_by_employee: this.ngnotes
    };

    this.api.post('jobCompletionByJobId', params).subscribe((data) => {
      this.toast.success(data.msg,'' ,{
        timeOut: 1000
      });
    this.spinner.hide();
    // this.hideDisplay = true;
    this.openPDF();
    this.getJobById();

    });
  }
  JobCompletedEmail() {
    // this.spinner.show();
    const params = {
      id: this.id,
      emp: localStorage.getItem('user_id'),
      notes_by_employee: this.ngnotes
    };
    this.api.post('sendMailJobCompletion', params).subscribe((data) => {
      this.toast.success(data.msg,'' ,{
        timeOut: 1000
      });
      // this.spinner.hide();
    });
  }
  openPDF():void {
//     this.spinner.show();
//     setTimeout(() => {
//     var HTML_Width = $(".canvas_div_pdf").width();
// 		var HTML_Height = $(".canvas_div_pdf").height();
// 		var top_left_margin = 15;
// 		var PDF_Width = HTML_Width+(top_left_margin*2);
// 		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
// 		var canvas_image_width = HTML_Width;
// 		var canvas_image_height = HTML_Height;

// 		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height);

    var form = new FormData;

// 		html2canvas($(".canvas_div_pdf")[0],{ useCORS:true}).then((canvas) => {
//       this.spinner.hide()
// // alert('hide')
// 			canvas.getContext('2d');

// 			console.log(canvas.height+"  "+canvas.width);


// 			var imgData = canvas.toDataURL("image/jpeg", 1.0);
//       var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
//       pdf.addImage(imgData, 'jpeg', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);

//       console.log(totalPDFPages)
// 			for (var i = 1; i <= totalPDFPages; i++) {
// 				pdf.addPage(PDF_Width, PDF_Height);
// 				pdf.addImage(imgData, 'jpeg', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
// 			}
//       // pdf.save("HTML-Document.pdf");

//       var dataURL = pdf.output('datauristring')
      // const file = this.DataURIToBlob(dataURL)
      // form.append('file', file);
      form.append('job', this.id);
      form.append('emp', localStorage.getItem('user_id'));
      // console.log(file);

        this.api.post('sharefile', form).subscribe((data) => {

          form = new FormData;
          if(data) {
            this.hideDisplay = false;
  
            this.sharelink = data.msg;
            this.JobCompletedEmail();
          }
        });
      
    // });

    // }, 1000);
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
sendEmail() {
  this.spinner.show();
  const params = {
    id: this.id,
    emp: localStorage.getItem('user_id')
  };
  this.api.post('sendEmail', params).subscribe((data) => {
    console.log(data.data);
    this.emailBody = 'Before and After Site Photos ( ' + this.api.imageUrl + data.data.share.filepath +' )'
    this.emailBody1 = data.data.forms.form_type +': ('  + this.api.imageUrl + data.data.forms.form_link + ' )';
    this.emailBody3 = 'Job Address: ' + this.jobsList.client_address
    this.emailBody4 = 'Note: ' + this.jobsList.notes_by_employee
    this.emailBody5 = 'Regards'
    this.emailBody6 = 'TradeViser Team'
    this.spinner.hide();
    this.openEamil();
  });
}
timeFormat(time) {
  return moment(time,'h:mm').format('h:mm a');
}
}
