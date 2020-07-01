import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogName: any;
  blog: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private BlogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogName = this.activatedRoute.snapshot.paramMap.get('blogName');
    this.BlogService.getUserBlog(this.blogName).subscribe((data) => {
      this.blog = data;
      if (this.blog.success) {
        this.blog = this.blog.blog;
        console.log(this.blog);
      } else {
        console.log('blog not found');
      }
    });
  }
}
