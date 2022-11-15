import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-frontpage-home',
  templateUrl: './frontPage-home.component.html',
  styleUrls: ['./frontPage-home.component.css']
})
export class FrontPageHomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Troca Óleo');
  }

}
