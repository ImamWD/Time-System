//_______________________VARS__________________________

let test_var = false;

let i1=false;
let i3=false;
let i4=false;
let i5=false;
let i6=false;
let i7=false;
let i8=false; 
let h1 , h2, m1 , m2;
let SCourses = [];
let Name;
let Price;
let Desc;
let Imag;
let hours;
let hours1;
let mins;
let mins1;
let Courses =[];
let Upload_path;
let MSG;
let rows = document.getElementById('table_body');
//____________Show initial data from localstorge_______
if(JSON.parse(localStorage.getItem("Courses")) == null)
{
     Courses=[];
}
else {
    Courses = JSON.parse(localStorage.getItem("Courses"));
    Display();
}
if(JSON.parse(localStorage.getItem("SCourses")) == null)
{
     SCourses=[];
}
else {
    SCourses = JSON.parse(localStorage.getItem("SCourses"));
}
//__________________On click add button________________
function Add_course()
{
    sweetinputs();
    des();

}
//___________________init sweetalert2__________________
function des()
{
    Swal.disableButtons();

}
//___________________Input sweetalert2_________________
async function sweetinputs()
{
    

    const { value: formValues } = await Swal.fire({
        title: 'Add New Task',
        confirmButtonText: 'Add Task',
        confirmButtonColor: '#2fa74e',
        html:  `<label style = "display:flex"> <p style="width:25%; margin-top: revert;">Name</p>  <input placeholder="Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control  swal2-input " style="width:80%"/></label>
                <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Description</p>  <input placeholder="Description" onkeyup="validation(this,2)" type="text" id="swal-input3" class="form-control swal2-input" style="width:80%"/></label>
                <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Image</p> <input placeholder="Image" type="file" id="swal-input4" class="form-control swal2-input" style="width:80%"  onchange="FileValidation(this)"/></label>
                <label style = "display:flex"> 
                    <p style="width:25%; margin-top: revert;">From</p>
                    <input placeholder="hours" onkeyup="validation(this,3)" type="text" id="swal-input5" class="form-control swal2-input" style="width:30%"/>
                    <p style="width:5%; margin-top: revert; margin-right: 10px; font-weight: bold;">:</p>
                    <input placeholder="min" onkeyup="validation(this,4)"  type="text" id="swal-input7" class="form-control swal2-input" style="width:30%"/>
                </label> 
                <label style = "display:flex"> 
                <p style="width:25%; margin-top: revert;">To</p>
                <input placeholder="hours" onkeyup="validation(this,5)" type="text" id="swal-input8" class="form-control swal2-input" style="width:30%"/>
                <p style="width:5%; margin-top: revert; margin-right: 10px; font-weight: bold;">:</p>
                <input placeholder="min" onkeyup="validation(this,6)"  type="text" id="swal-input9" class="form-control swal2-input" style="width:30%"/>
            </label>
              <p style="text-align: center; color: red;" id="MSSG"></p>
                `,
        focusConfirm: true,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
                document.getElementById('swal-input5').value,
                document.getElementById('swal-input7').value,
                document.getElementById('swal-input8').value,
                document.getElementById('swal-input9').value
                
                 ]
        }
    })
      if (formValues) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: '#2fa74e',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              storeData(JSON.stringify(formValues));
              Swal.fire('Saved New Task.', '', 'success')
              m1.value ="";
              m2.value ="";
              h1.value ="";
              h2.value ="";
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
      };
 
}
 
FileValidation = (E) => {

    const reader = new FileReader();
    reader.addEventListener('load', function() {
        Upload_path = reader.result;
    })    ;
    reader.readAsDataURL(E.files[0]);
}
//_________________Validation function ________________
 function validation(V,flag)
{
    h1 = document.getElementById('swal-input5');
m1 = document.getElementById('swal-input7');
h2 = document.getElementById('swal-input8');
m2 = document.getElementById('swal-input9')

    let MSG = document.getElementById('MSSG');
    let condition;
   if(flag == 0)//----------  name validation

   {
    condition = /^[A-Z][a-z]{2,10}$/;
    if(condition.test(V.value))
    {
        i1=true;
        V.classList.add("is-valid");
        V.classList.remove("is-invalid");
    }
    else
    {
        i1=false;
        V.classList.remove("is-valid");
        V.classList.add("is-invalid");
    }
   }
    else if(flag == 2)//---------- Desc validation
    {
        if(V.value.length >10 && V.value.length<5000)// any ASCII but ,must be length range 10 to 5000
        {
            i3=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i3=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    else if(flag == 3)//---------- hourse validation
    {
        h1 = V;
        condition =  /^[0-9]{1,5}$/;
        let x ;

        x=true;
        if(h1.value!="" && h2.value!="" && m1.value!="" && m2.value!="")
        {
            if(Number(h1.value) > Number(h2.value))
            {
                x = false;
                m1.value ="";
                m2.value ="";
                h1.value ="";
                h2.value ="";
                MSG.innerHTML = "This time is not available";
                i4=false;
                h1.classList.remove("is-valid");
                h1.classList.add("is-invalid");
                i6=false;
                h2.classList.remove("is-valid");
                h2.classList.add("is-invalid");
                i7=false;
                m1.classList.remove("is-valid");
                m1.classList.add("is-invalid");
                i8=false;
                m2.classList.remove("is-valid");
                m2.classList.add("is-invalid");
            }

            else if(Number(h1.value) ==Number(h2.value))
            {
                 if( Number(m1.value) >= Number(m2.value))
                 {
                    x = false;
                    m1.value ="";
                    m2.value ="";
                    h1.value ="";
                    h2.value ="";
                    MSG.innerHTML = "This time is not available";
                    i4=false;
                    h1.classList.remove("is-valid");
                    h1.classList.add("is-invalid");
                    i6=false;
                    h2.classList.remove("is-valid");
                    h2.classList.add("is-invalid");
                    i7=false;
                    m1.classList.remove("is-valid");
                    m1.classList.add("is-invalid");
                    i8=false;
                    m2.classList.remove("is-valid");
                    m2.classList.add("is-invalid");

                 }
                 else
                 {
                    x = true
                 }
            }

            else
            {
                x = true;
            }
        }

        if(V.value >= 0 && V.value<24 &&condition.test(V.value) && x == true)
        {
            i4=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i4=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    else if(flag == 4)//---------- min validation
    {
        m1 = V;
        condition =  /^[0-9]{1,5}$/;
        let x ;

        x=true;
        if(h1.value!="" && h2.value!="" && m1.value!="" && m2.value!="")
        {
            if(Number(h1.value) > Number(h2.value))
            {
                x = false;

                m1.value ="";
                m2.value ="";
                h1.value ="";
                h2.value ="";
                MSG.innerHTML = "This time is not available";
                i4=false;
                h1.classList.remove("is-valid");
                h1.classList.add("is-invalid");
                i6=false;
                h2.classList.remove("is-valid");
                h2.classList.add("is-invalid");
                i7=false;
                m1.classList.remove("is-valid");
                m1.classList.add("is-invalid");
                i8=false;
                m2.classList.remove("is-valid");
                m2.classList.add("is-invalid");
            }

            else if(Number(h1.value) == Number(h2.value))
            {
                 if(Number(m1.value) >= Number(m2.value))
                 {
                    x = false;

                    m1.value ="";
                    m2.value ="";
                    h1.value ="";
                    h2.value ="";
                    MSG.innerHTML = "This time is not available";
                    i4=false;
                    h1.classList.remove("is-valid");
                    h1.classList.add("is-invalid");
                    i6=false;
                    h2.classList.remove("is-valid");
                    h2.classList.add("is-invalid");
                    i7=false;
                    m1.classList.remove("is-valid");
                    m1.classList.add("is-invalid");
                    i8=false;
                    m2.classList.remove("is-valid");
                    m2.classList.add("is-invalid");
                 }
                 else
                 {
                    x = true
                 }
            }

            else
            {
                x = true;
            }
        }

        if(V.value >= 0 && V.value<60 && condition.test(V.value) && x == true)
        {
            i6=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i6=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    else if(flag == 5)//---------- hourse1 validation
    {
        h2 = V;
        condition =  /^[0-9]{1,5}$/;
        let x ;

        x=true;
        if(h1.value!="" && h2.value!="" && m1.value!="" && m2.value!="")
        {
            if(Number(h1.value) > Number(h2.value))
            {
                x = false;

                m1.value ="";
                m2.value ="";
                h1.value ="";
                h2.value ="";
                MSG.innerHTML = "This time is not available";
                i4=false;
                h1.classList.remove("is-valid");
                h1.classList.add("is-invalid");
                i6=false;
                h2.classList.remove("is-valid");
                h2.classList.add("is-invalid");
                i7=false;
                m1.classList.remove("is-valid");
                m1.classList.add("is-invalid");
                i8=false;
                m2.classList.remove("is-valid");
                m2.classList.add("is-invalid");
            }

            else if(Number(h1.value) == Number(h2.value))
            {
                 if(Number(m1.value) >= Number(m2.value))
                 {
                    x = false;
                    m1.value ="";
                    m2.value ="";
                    h1.value ="";
                    h2.value ="";
                    MSG.innerHTML = "This time is not available";
                    i4=false;
                    h1.classList.remove("is-valid");
                    h1.classList.add("is-invalid");
                    i6=false;
                    h2.classList.remove("is-valid");
                    h2.classList.add("is-invalid");
                    i7=false;
                    m1.classList.remove("is-valid");
                    m1.classList.add("is-invalid");
                    i8=false;
                    m2.classList.remove("is-valid");
                    m2.classList.add("is-invalid");
                 }
                 else
                 {
                    x = true
                 }
            }

            else
            {
                x = true;
            }
        }
        if(V.value >= 0 && V.value<24 &&condition.test(V.value) && x == true)
        {
            i7=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i7=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    else if(flag == 6)//---------- min1 validation
    {
        m2 = V;
        condition =  /^[0-9]{1,5}$/;
        let x ;

        x=true;
        if(h1.value!="" && h2.value!="" && m1.value!="" && m2.value!="")
        {
            if(Number(h1.value) > Number(h2.value))
            {
                x = false;

                m1.value ="";
                m2.value ="";
                h1.value ="";
                h2.value ="";
                MSG.innerHTML = "This time is not available";
                i4=false;
                h1.classList.remove("is-valid");
                h1.classList.add("is-invalid");
                i6=false;
                h2.classList.remove("is-valid");
                h2.classList.add("is-invalid");
                i7=false;
                m1.classList.remove("is-valid");
                m1.classList.add("is-invalid");
                i8=false;
                m2.classList.remove("is-valid");
                m2.classList.add("is-invalid");
            }

            else if(Number(h1.value) == Number(h2.value))
            {
                 if(Number(m1.value) >= Number(m2.value))
                 {
                    x = false;

                    m1.value ="";
                    m2.value ="";
                    h1.value ="";
                    h2.value ="";
                    MSG.innerHTML = "This time is not available";
                    i4=false;
                    h1.classList.remove("is-valid");
                    h1.classList.add("is-invalid");
                    i6=false;
                    h2.classList.remove("is-valid");
                    h2.classList.add("is-invalid");
                    i7=false;
                    m1.classList.remove("is-valid");
                    m1.classList.add("is-invalid");
                    i8=false;
                    m2.classList.remove("is-valid");
                    m2.classList.add("is-invalid");
                 }
                 else
                 {
                    x = true
                 }
            }

            else
            {
                x = true;
            }
        }
        if(V.value >= 0 && V.value<60 && condition.test(V.value) && x == true)
        {
            i8=true;
            V.classList.add("is-valid");
            V.classList.remove("is-invalid");
       }
       else
       {
           i8=false;
           V.classList.remove("is-valid");
           V.classList.add("is-invalid");
       }
    }
    if(i4  && i6 && i7 && i8)
    {
        MSG.innerHTML = "";

    }

    if(i1 && i3 && i4  && i6 && i7 && i8)//-to enable and disable sweetalert buttons
    {
        test_var = true;
        Swal.enableButtons();
    }
    else
    {
        test_var =false;
        Swal.disableButtons();	
    }
}
//____________________Store function___________________
function storeData(Data)
{

    //-convert data from String format to Array  
    let Course_init =[]
    Course_init= Data.split("\"");
    let Course_data =[];
    let j=0
    for(let i=0;i<Course_init.length;i++)
    {
        if(i%2==1)
        {
            Course_data[j]=Course_init[i];
            j++;
        }
    }

     //let Image = Course_data[3].split("\\\\");
   let Course = 
    {
        Name : Course_data[0],
        Description : Course_data[1],
        Image : Upload_path,
        hours : Course_data[3],
        min : Course_data[4],
        hours1 : Course_data[5],
        min1 : Course_data[6],
        Special : 0
    }
    Courses.push(Course);
    localStorage.setItem("Courses", JSON.stringify(Courses));
    Display();
}
//________________Display data on table _______________
function Display()
{
    let val ="";
    for(let i=0;i<Courses.length;i++)
    {
        if(Courses[i].Special == 1)
        {
        val +=  `<tr style=" background-color : rgb(0, 128, 0,.2)">
                    <th>${i+1}</th>
                    <td>${Courses[i].Name}</td>
                    <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min}
                        <span style="font-weight: bold;">m</span>
                    </td>

                    <td>
                    <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                    <span style="font-weight: bold;">h</span> 
                    <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                    <span style="font-weight: bold;">m</span>
                   </td>

                    <td><img onclick = "img_onclick(${i})" style="width: 100px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                    <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                    <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                    <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                `;

                    if(Courses[i].Special == 1)
                    {
                        val+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                        </tr>
                        `;
                    }
                    else
                    {
                        val+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                        </tr>
                        `; 
                    }
                }
                else
                {
                    val +=  `<tr>
                    <th>${i+1}</th>
                    <td>${Courses[i].Name}</td>
                    <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min}
                        <span style="font-weight: bold;">m</span>
                    </td>

                    <td>
                    <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                    <span style="font-weight: bold;">h</span> 
                    <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                    <span style="font-weight: bold;">m</span>
                   </td>

                    <td><img onclick = "img_onclick(${i})" style="width: 100px;  text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                    <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                    <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                    <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                `;

                    if(Courses[i].Special == 1)
                    {
                        val+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                        </tr>
                        `;
                    }
                    else
                    {
                        val+= 
                        `
                        <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                        </tr>
                        `; 
                    }
                }
                    

    }
    rows.innerHTML = val;
}
//-------------------Delete functions------------------
//________________On click delete button_______________
function delete_item(index)
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Courses.splice(index,1);
            localStorage.setItem("Courses", JSON.stringify(Courses));
            Display();
          Swal.fire('Deleted!','Task has been deleted.','success')
        }
      })
   
}
//______________On click delete All button_____________
function delete_all()
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            let C = 0;
            let P =0;
            C=Courses.length;
            let CO =[];
            for(let i=0;i< C;i++)
            {
                if(Courses[i].Special === 1)
                {
                    P++;
                    SCourses.push(Courses[i]);
                    localStorage.setItem("SCourses", JSON.stringify(SCourses));
               }
               else
               {
                CO.push(Courses[i]);
               }
           }

           let count5 = Courses.length;
           for(let i=0 ;i<count5;i++)
           {
           Courses.pop();
           }
           localStorage.setItem('Courses',JSON.stringify(Courses));
           for(let j=0;j<CO.length;j++)
           {
           Courses.push(CO[j]);
           }
           localStorage.setItem('Courses',JSON.stringify(Courses));

          Display();
          if(P === 0)
          {
            Swal.fire('Empty!','You have not accomplished any task','error');

          }
          else{
          Swal.fire('Deleted!','Your Tasks has been deleted.','success');
          }
        }
      });
}
//-------------------Edit functions--------------------
//___________________Edit any Course___________________
function edit_item(index)
{
    Name = Courses[index].Name;
    Desc = Courses[index].Description;
    Imag = Courses[index].Image;
    hours = Courses[index].hours;
    mins = Courses[index].min;
    hours1 = Courses[index].hours1;
    mins1 = Courses[index].min1;
    sweetupdate(index);
    set_data();
}
//___________________Update sweetalert2________________
async function sweetupdate(INDEX)
{

const { value: formValues } = await Swal.fire({
    title: 'Update for ' + Courses[INDEX].Name +' Task',
    confirmButtonText: 'Update Task',
    confirmButtonColor: '#2fa74e',
    html: `<label style = "display:flex"> <p style="width:25%; margin-top: revert;">Name</p>  <input placeholder="Name" onkeyup="validation(this,0)"  type="text" id="swal-input1" class="form-control  swal2-input " style="width:80%"/></label>
    <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Description</p>  <input placeholder="Description" onkeyup="validation(this,2)" type="text" id="swal-input3" class="form-control swal2-input" style="width:80%"/></label>
    <label style = "display:flex"> <p style="width:25%; margin-top: revert;">Image</p> <input placeholder="Image" type="file" id="swal-input4" class="form-control swal2-input" style="width:80%"  onchange="FileValidation(this)"/></label>
    <label style = "display:flex"> 
        <p style="width:25%; margin-top: revert;">From</p>
        <input placeholder="hours" onkeyup="validation(this,3)" type="text" id="swal-input5" class="form-control swal2-input" style="width:30%"/>
        <p style="width:5%; margin-top: revert; margin-right: 10px; font-weight: bold;">:</p>
        <input placeholder="min" onkeyup="validation(this,4)"  type="text" id="swal-input7" class="form-control swal2-input" style="width:30%"/>
    </label> 
    <label style = "display:flex"> 
    <p style="width:25%; margin-top: revert;">To</p>
    <input placeholder="hours" onkeyup="validation(this,5)" type="text" id="swal-input8" class="form-control swal2-input" style="width:30%"/>
    <p style="width:5%; margin-top: revert; margin-right: 10px; font-weight: bold;">:</p>
    <input placeholder="min" onkeyup="validation(this,6)"  type="text" id="swal-input9" class="form-control swal2-input" style="width:30%"/>
</label>
  <p style="text-align: center; color: red;" id="MSSG"></p>
    `,
        focusConfirm: true,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input3').value,
            document.getElementById('swal-input4').value,
            document.getElementById('swal-input5').value,
            document.getElementById('swal-input7').value,
            document.getElementById('swal-input8').value,
            document.getElementById('swal-input9').value

                  ]
        }
      })
      if (formValues) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            confirmButtonColor: "#218838",
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                update(JSON.stringify(formValues),INDEX);
              Swal.fire('Task Updated.', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
      };
}
//_____________show course data in sweetalert__________
function set_data()
{
    Swal.disableButtons();
    let In1 = document.getElementById('swal-input1');
    let In3 = document.getElementById('swal-input3');
    let In5 = document.getElementById('swal-input5');
    let In6 = document.getElementById('swal-input7');
    let In7 = document.getElementById('swal-input8');
    let In8 = document.getElementById('swal-input9');

    h1 = document.getElementById('swal-input5');
    m1 = document.getElementById('swal-input7');
    h2 = document.getElementById('swal-input8');
    m2 = document.getElementById('swal-input9');

    In1.value = Name;
    In3.value = Desc;
    In5.value = hours;
    In6.value = mins;
    In7.value = hours1;
    In8.value = mins1;
   

    In1.classList.add('is-valid');
    In3.classList.add('is-valid');
    In5.classList.add('is-valid');
    In6.classList.add('is-valid');
    In7.classList.add('is-valid');
    In8.classList.add('is-valid');

    i1 = true;
    i3 = true;
    i4 = true;
    i5 = true;
    i6 = true;
    i7 = true;
    i8 = true;

}
//_____________________Update Course___________________
function update(Data,index)
{
    let Course_init =[]
    Course_init= Data.split("\"");
    let Course_data =[];
    let j=0
    for(let i=0;i<Course_init.length;i++)
    {
        if(i%2==1)
        {
            Course_data[j]=Course_init[i];
            j++;
        }
    }
    let Image = Course_data[2].split("\\\\");
    
        Courses[index].Name = Course_data[0];
        Courses[index].Description = Course_data[1];
        if(Image[2]!=null)
        {
        Courses[index].Image = Upload_path;
        }
        Courses[index].hours = Course_data[3];
        Courses[index].min = Course_data[4];
        Courses[index].hours1 = Course_data[5];
        Courses[index].min1 = Course_data[6];
        localStorage.setItem("Courses", JSON.stringify(Courses));
        Display();
} 
//-------------------Search functions------------------
//_____________________choose select___________________
let selector = document.getElementById('sel_search');
function select_search(Value)
{
    if(selector.value === "name")
    {
        search_data(Value,0);
    }
    else if(selector.value === "from")
    {
        search_data(Value,1);
    }
    else
    {
        search_data(Value,2);
    }
}
//________________show data after search________________
function search_data(value,column)
{
    let table_content ="";
    if(column === 0)
    {
        table_content ="";
    for(let i=0;i<Courses.length;i++)
    {
        if(Courses[i].Name.includes(value.value))
        {
            if(Courses[i].Special == 1)
            {
            table_content +=  `<tr style=" background-color : rgb(0, 128, 0,.2)">
                        <th>${i+1}</th>
                        <td>${Courses[i].Name}</td>
                        <td>
                            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                            <span style="font-weight: bold;">h</span> 
                            <span style="font-weight: bold;">:</span> ${Courses[i].min}
                            <span style="font-weight: bold;">m</span>
                        </td>
    
                        <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                        <span style="font-weight: bold;">m</span>
                       </td>
    
                        <td><img onclick = "img_onclick(${i})" style="width: 100px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                        <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                        <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                        <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                    `;
    
                        if(Courses[i].Special == 1)
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                            </tr>
                            `;
                        }
                        else
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                            </tr>
                            `; 
                        }
                    }
                    else
                    {
                        table_content +=  `<tr>
                        <th>${i+1}</th>
                        <td>${Courses[i].Name}</td>
                        <td>
                            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                            <span style="font-weight: bold;">h</span> 
                            <span style="font-weight: bold;">:</span> ${Courses[i].min}
                            <span style="font-weight: bold;">m</span>
                        </td>
    
                        <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                        <span style="font-weight: bold;">m</span>
                       </td>
    
                        <td><img onclick = "img_onclick(${i})" style="width: 100px;  text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                        <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                        <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                        <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                    `;
    
                        if(Courses[i].Special == 1)
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                            </tr>
                            `;
                        }
                        else
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                            </tr>
                            `; 
                        }
                    }
        }
    }
    }
    else  if(column === 1)
    {
        table_content ="";
    for(let i=0;i<Courses.length;i++)
    {
        if(Courses[i].hours.includes(value.value))
        {
            if(Courses[i].Special == 1)
            {
            table_content +=  `<tr style=" background-color : rgb(0, 128, 0,.2)">
                        <th>${i+1}</th>
                        <td>${Courses[i].Name}</td>
                        <td>
                            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                            <span style="font-weight: bold;">h</span> 
                            <span style="font-weight: bold;">:</span> ${Courses[i].min}
                            <span style="font-weight: bold;">m</span>
                        </td>
    
                        <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                        <span style="font-weight: bold;">m</span>
                       </td>
    
                        <td><img onclick = "img_onclick(${i})" style="width: 100px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                        <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                        <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                        <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                    `;
    
                        if(Courses[i].Special == 1)
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                            </tr>
                            `;
                        }
                        else
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                            </tr>
                            `; 
                        }
                    }
                    else
                    {
                        table_content +=  `<tr>
                        <th>${i+1}</th>
                        <td>${Courses[i].Name}</td>
                        <td>
                            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                            <span style="font-weight: bold;">h</span> 
                            <span style="font-weight: bold;">:</span> ${Courses[i].min}
                            <span style="font-weight: bold;">m</span>
                        </td>
    
                        <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                        <span style="font-weight: bold;">m</span>
                       </td>
    
                        <td><img onclick = "img_onclick(${i})" style="width: 100px;  text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                        <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                        <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                        <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                    `;
    
                        if(Courses[i].Special == 1)
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                            </tr>
                            `;
                        }
                        else
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                            </tr>
                            `; 
                        }
                    }
        }
    }
    }
    else
    {
        table_content ="";
        for(let i=0;i<Courses.length;i++)
        {
            if(Courses[i].hours1.includes(value.value))
            {
                if(Courses[i].Special == 1)
            {
            table_content +=  `<tr style=" background-color : rgb(0, 128, 0,.2)">
                        <th>${i+1}</th>
                        <td>${Courses[i].Name}</td>
                        <td>
                            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                            <span style="font-weight: bold;">h</span> 
                            <span style="font-weight: bold;">:</span> ${Courses[i].min}
                            <span style="font-weight: bold;">m</span>
                        </td>
    
                        <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                        <span style="font-weight: bold;">m</span>
                       </td>
    
                        <td><img onclick = "img_onclick(${i})" style="width: 100px; text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                        <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                        <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                        <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                    `;
    
                        if(Courses[i].Special == 1)
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                            </tr>
                            `;
                        }
                        else
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                            </tr>
                            `; 
                        }
                    }
                    else
                    {
                        table_content +=  `<tr>
                        <th>${i+1}</th>
                        <td>${Courses[i].Name}</td>
                        <td>
                            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours}
                            <span style="font-weight: bold;">h</span> 
                            <span style="font-weight: bold;">:</span> ${Courses[i].min}
                            <span style="font-weight: bold;">m</span>
                        </td>
    
                        <td>
                        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${Courses[i].hours1}
                        <span style="font-weight: bold;">h</span> 
                        <span style="font-weight: bold;">:</span> ${Courses[i].min1}
                        <span style="font-weight: bold;">m</span>
                       </td>
    
                        <td><img onclick = "img_onclick(${i})" style="width: 100px;  text-align: center;" class="car-img" src="${Courses[i].Image}"></td>
                        <td style="margin:auto;"><button class="btn btn-secondary" onclick="Desc_val(${i})"><i class="fa-solid fa-file-medical"></i></button></td>
                        <td style="width:10%;"><button onclick="edit_item(${i})" class="btn btn-info"> <i class="fa-solid fa-pen"></i></button></td>
                        <td style="width:10%;"><button onclick="delete_item(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> </button></td>
                    `;
    
                        if(Courses[i].Special == 1)
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info" Checked/> </td>
                            </tr>
                            `;
                        }
                        else
                        {
                            table_content+= 
                            `
                            <td style="width:10%"> <input type="checkbox" onclick="Special(${i},this)" class="btn btn-info"/> </td>
                            </tr>
                            `; 
                        }
                    }
            }
        }
    }
    rows.innerHTML = table_content;
}
async function Desc_val(index)
{
    Swal.fire({
        title :'Description for '+ Courses[index].Name,
        text: Courses[index].Description,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}
function img_onclick(index)
{
    Swal.fire({
        title: Courses[index].Name,
        text: 'Task Image ...',
        imageUrl: Courses[index].Image,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
      })
}
function Special(index,val)
{
    if(val.checked)
    {
        Courses[index].Special = 1;
    }
    else
    {
        Courses[index].Special = 0;
    }
    Display();
    localStorage.setItem("Courses", JSON.stringify(Courses));
}
async function show_Done()
{
    if(!SCourses.length)
    {
        Swal.fire('Empty!','You have not accomplished any task','error');
        return;
    }
    let val ='';
    for(let i=0;i<SCourses.length;i++)
    {
        val +=  `<tr style="width:100%">
        <td><h6>${SCourses[i].Name}</h6></td>
        <td style="font-size:13px">
            <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${SCourses[i].hours}
            <span style="font-weight: bold;">h</span> 
            <span style="font-weight: bold;">:</span> ${SCourses[i].min}
            <span style="font-weight: bold;">m</span>
        </td>

        <td style="font-size:13px">
        <i class="fa-solid fa-clock" style="font-weight: bold;"></i> ${SCourses[i].hours1}
        <span style="font-weight: bold;">h</span> 
        <span style="font-weight: bold;">:</span> ${SCourses[i].min1}
        <span style="font-weight: bold;">m</span>
       </td>

        <td><img style="height:50px" onclick = "img_onclick(${i})" style="width: 50px; text-align: center;" class="car-img" src="${SCourses[i].Image}"></td>
    `;
    }
    let RE = `
    <button onclick="Delete_Hstory()" class="btn btn-secondary ">
    <i class="fa-solid fa-arrow-rotate-right"></i> Clear
     </button>
    <div style="width:100%; overflow: scroll;">
     <table class="table table-primary table-hover m-auto" style="width:100%;">
    <thead>
        <tr>
            <th scope="col" >Name</th>
            <th scope="col">Form </th>
            <th scope="col">To </th>
            <th scope="col">Image </th>
        </tr>
    </thead>
    <tbody>
    `
    + val +
    `
    </tbody>
    </table>
    </div>`;

    const { value: formValues } = await Swal.fire({
        title: 'All Tasks done',
        confirmButtonText: 'End',
        confirmButtonColor: '#2fa74e',
        html: RE,
        focusConfirm: true,
        preConfirm: () => {
            return [
                 ]
        }
    })
      if (formValues) {
      };
    
}
function Delete_Hstory()
{
    let count = SCourses.length;
            for(let i=0 ;i<count;i++)
            {
            SCourses.pop();
            }
            localStorage.setItem('SCourses',JSON.stringify(SCourses));

            Swal.fire('Deleted!','Your Tasks has been deleted.','success')

}