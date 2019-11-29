import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: []
})
export class PaginatorComponent implements OnInit, OnChanges {


  @Input()
  paginator: any;

  pages: number[];
  since: number;
  until; number;

  constructor() { }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges( changes: SimpleChanges ) {
    const paginatorUpdate = changes['paginator'];

    if (paginatorUpdate.previousValue ) {
      this.initPaginator();
    }

  }

  private initPaginator(): void {
    this.since =
      Math.min(Math.max( 1, this.paginator.number - 4 ), this.paginator.totalPages - 5 );
    this.until =
      Math.min(Math.min( this.paginator.totalPages, this.paginator.number + 4 ), 6);

    if ( this.paginator.totalPages > 10 ) {
    this.pages = new Array(this.until - this.since + 1).fill(0).map((value, index) =>
      index + this.since
    );
    } else {
      this.pages = new Array[this.paginator.totalPages].fill(0).map( ( value, index ) =>
        index + 1
      );
    }
  }

}
