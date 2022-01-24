import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  product!:FormGroup;
  description:any=['cotten shirt'];
  clothSize:any=['l','xl','xxl'];
  catagory:any=['girl','boy'];
  productData: any;
  editProductInfo: any;

  
  constructor(private http:HttpClient,private fb:FormBuilder) { 
    this.product=this.fb.group({
      category:[''],
      productName:[''],
      description:[''],
      price:[''],
      clothSize:[''],
      inStock:[''],
      id:['']
    })
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
      this.http.get(`${environment.apiProduct}/product/get`).subscribe((res:any)=>{
        this.productData = res.data
      })
  }

  deleteProduct(id:number){
    this.http.delete(`${environment.apiProduct}/product/delete?id=${id}`).subscribe((res:any) => {
      if(res.isSuccess){
        alert('data deleted successfully')
        this.getProduct()
      }else{
        alert(res.message)
      }
    })
  }

  updateProduct(){
    this.http.post(`${environment.apiProduct}/product/update`,{
      ...this.editProductInfo,
      id:this.editProductInfo.id,
      ...this.product.value
     }).subscribe((res:any) =>{
       if(res.isSuccess){
         this.editProductInfo=null
         alert('data update successfully')
         this.product.reset()
         this.getProduct()
      }else{
         alert(res.message)
       }
     })
   }

   addProduct(){
     if(this.editProductInfo){
       this.updateProduct()
       return
     }
     this.http.post(`${environment.apiProduct}/product/add`,this.product.value).
     subscribe((res:any) => {
       if(res.Success){
          this.editProductInfo=null
          alert('data added successfully')
          this.product.reset()
          this.getProduct()
       }else{
         alert(res.message)
       }
     })
   }

   editProduct(product:any){
       this.editProductInfo = product
       this.product.patchValue({
        category:product.category,
        productName:product.productName,
        description:product.description,
        price:product.price,
        clothSize:product.clothSize,
        inStock:product.inStock,
        id:product.id
       })
   }
  
}
