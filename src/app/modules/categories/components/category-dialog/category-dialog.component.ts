import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

interface DialogData {
  name: string;
  type: string;
}

@Component({
  selector: 'app-category-dialog',
  styleUrls: ['./category-dialog.component.scss'],
  templateUrl: './category-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDialogComponent implements OnInit {
  categoryForm = this.fb.group({
    type: ['expense', Validators.required],
    name: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData | string,
  ) {}

  ngOnInit(): void {
    if (this.data && typeof this.data === 'string') {
      this.categoryForm.patchValue({
        type: this.data,
      });
    }

    if (this.data && typeof this.data === 'object') {
      this.categoryForm.patchValue({
        name: this.data.name,
        type: this.data.type,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      const payload = this.categoryForm.value;

      this.dialogRef.close(payload);
    }
  }
}
