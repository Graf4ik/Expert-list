import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IFilter } from "../../models/filter";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filterEvent: EventEmitter<IFilter> = new EventEmitter();
  public filterForm!: FormGroup;
  public searchField: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      fio: [''],
    })
  }

  protected filter(): void {
    this.filterEvent.emit(this.filterForm.value);
  }

  protected change(event: unknown): void {
    if (typeof event === 'string') {
      if (!event.length) this.filterEvent.emit(this.filterForm.value);
    } else return;
  }
}
