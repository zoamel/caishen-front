import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Category } from '@app/core';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesTableComponent {
  @Input() categories: Category[];

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Category>();

  // Table config
  displayedColumns: string[] = ['name', 'actions'];
}
