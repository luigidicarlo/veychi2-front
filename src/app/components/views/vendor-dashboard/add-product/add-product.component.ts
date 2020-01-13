import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '../../../../models/response.model';

import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\'. -]+$'), Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.minLength(3)]),
    discount: new FormControl('', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]),
    images: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  token: any = '';
  submitted = false;
  error = false;
  edit: boolean = false;
  singleProduct: any = {};
  categories: any[] = [];

  selectedImage: File = null;

  constructor(public productService: ProductService, public categoryService: CategoryService,
    public auth: AuthService, public router: Router, public activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showCategories();
    const params = this.activedRoute.snapshot.params;
    if(params.id) {
      this.edit = true;
      this.findProduct(params.id);
    }    
  }

  onSubmit() {
    this.submitted = true;
    const tagtext = this.productForm.get('tags').value;
    console.log(tagtext);
    let tagSplit = [];
    tagSplit = tagtext.map(item => {
        return item.value;
    });
    console.log(tagSplit);
    const image = this.productForm.get('images').value;
    const imageSplit = image.split(" ", 3);
    const product = {
      name: this.productForm.get('name').value as string,
      price: this.productForm.get('price').value as number,
      discount: this.productForm.get('discount').value as number,
      description: this.productForm.get('description').value as string,
      shortDescription: this.productForm.get('shortDescription').value as string,
      images: imageSplit,
      tags: tagSplit,
      category: this.productForm.get('category').value as string
    };

    console.log(product);

    this.productService.createProduct(product, this.token).subscribe(
      (res: Response) => {
        if(res.ok) {
          console.log(res);          
          this.router.navigate(['/vendor-panel/productos']);
        }        
      },
      err => {
        console.log(err);
        this.submitted = false;
        this.error = true;
      }
    );
  }

  onEdit() {
    this.submitted = true;
    const tagtext = this.productForm.get('tags').value;
    console.log(tagtext);
    let tagSplit = [];
    tagSplit = tagtext.map(item => {
        return item.value;
    });
    const product = {
      name: this.productForm.get('name').value as string,
      price: this.productForm.get('price').value as number,
      discount: this.productForm.get('discount').value as number,
      description: this.productForm.get('description').value as string,
      shortDescription: this.productForm.get('shortDescription').value as string,
      images: this.singleProduct.images,
      tags: tagSplit,
      category: this.productForm.get('category').value as string
    };
    console.log("Editando...");
    this.productService.updateProduct(this.singleProduct._id, product, this.token).subscribe(
      res => {
        console.log("Edición exitosa");
        console.log(res);
        if(res.ok) {
          this.router.navigate(['/vendor-panel/productos']);
        }
      },
      err => {
        console.error(err);
        this.submitted = false;
        this.error = true;
      }
    );
  }

  findProduct(id: string) {
    this.productService.getProduct(id).subscribe(
      (res: Response) => {
        console.log(res);
        if(res.ok) {
          this.singleProduct = res.data;
        }
      },
      err => console.log(err)
    );
  }

  showCategories() {
    this.categoryService.getCategories().subscribe(
      (res: Response) => {
        if(res.ok) {
          console.log(res.data);
          this.categories = res.data;
        }        
      },
      err => console.log(err)
    )
  }

  onUpload(event) {
    console.log(event.target.files[0]);
    this.selectedImage = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('images', this.selectedImage);
    console.log(formData);
    this.productService.sendFile(formData, this.token).subscribe(
      (res: Response) => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

}
