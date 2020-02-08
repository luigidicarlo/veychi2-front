import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from '@angular/router';
import Product from '../../../models/product.model';
import { Response } from '../../../models/response.model';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
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

  async onSubmit() {
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
    const product = new Product(
      null,
      this.productForm.get('name').value as string,
      this.productForm.get('description').value as string,
      this.productForm.get('shortDescription').value as string,
      this.productForm.get('price').value as number,
      this.productForm.get('discount').value as number,
      null,
      imageSplit,
      tagSplit,
      null,
      this.productForm.get('category').value as string,
      null,
      null,
      null,
      null,
      null,
      null
    );

    console.log(product);
    try {
      const createdProduct = await this.productService.createProduct(product, this.token).catch(err => {
        throw err;
      });      
      Swal.fire({
        title: "Producto creado",
        icon: "success",
        html: `Se ha creado el producto ${createdProduct.name}`
      });
      this.router.navigate(['/vendor-panel/productos']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de crear el producto.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

  async onEdit() {
    this.submitted = true;
    const tagtext = this.productForm.get('tags').value;
    console.log(tagtext);
    let tagSplit = [];
    tagSplit = tagtext.map(item => {
        return item.value;
    });
    const product = new Product(
      null,
      this.productForm.get('name').value as string,
      this.productForm.get('description').value as string,
      this.productForm.get('shortDescription').value as string,
      this.productForm.get('price').value as number,
      this.productForm.get('discount').value as number,
      null,
      null,
      tagSplit,
      null,
      this.productForm.get('category').value as string,
      null,
      null,
      null,
      null,
      null,
      null
    );
    console.log("Editando...");
    try {
      const updatedProduct = await this.productService.updateProduct(this.singleProduct._id, product, this.token).catch(err => {
        throw err;
      });      
      Swal.fire({
        title: "Producto creado",
        icon: "success",
        html: `Se ha actualizado el producto ${updatedProduct.name}`
      });
      this.router.navigate(['/vendor-panel/productos']);
    } catch (err) {
      console.log(err);
      this.submitted = false;
      this.error = true;
      Swal.fire({
        title: "Error",
        icon: "error",
        html:
          "Ha ocurrido un error al tratar de actualizar el producto.<br>Verifica los datos e intenta de nuevo"
      });
    }
  }

  async findProduct(id: string) {
    try {
      this.singleProduct = await this.productService.getProduct(id).catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }

  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
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
