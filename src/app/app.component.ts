import { Component, OnInit } from '@angular/core';
import { DogService } from './services/dog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dog-images';
  breedNames: string[] = [];
  selectedBreedName: string = 'hound';
  imgFoundFlag: boolean = true;
  msg: string = '';
  breedImageUrl: string =
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg';
  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.dogService.getAllBreeds().subscribe((data) => {
      this.breedNames = Object.keys(data.message);
      const length = this.breedNames.length;
      for (var i = 0; i < length; i++) {
        if (data.message[this.breedNames[i]]?.length > 0) {
          for (const subBreedName of data.message[this.breedNames[i]]) {
            this.breedNames.push(`${subBreedName} ${this.breedNames[i]}`);
          }
        }
      }
    });
  }

  onBreedChange() {
    let arr = this.selectedBreedName.split(' ');
    let arg: string;
    if (arr.length == 2) {
      arg = `${arr[1]}/${arr[0]}`;
    } else {
      arg = this.selectedBreedName;
    }
    this.dogService.getBreedImage(arg).subscribe((imgData) => {
      if(imgData.status != 'success'){
        this.imgFoundFlag = false;
        this.msg = imgData.message;
      }
      this.imgFoundFlag = true;
      this.breedImageUrl = imgData.message;
    });
  }
}
