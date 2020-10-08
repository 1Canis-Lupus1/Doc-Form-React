import React, { Component } from 'react';
import './form.css';
import { docData } from '../http/http-calls';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      isDirty: {
        username: false
      },
      status: false,
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };

  componentDidMount() {
    docData().then(response => {
      console.log("Response",response)
      this.setState({
        fields: response,
        status: true
      })
      // console.log("Status:", response.name)
    })
      .catch(error => console.log(error))
  }

  handleChange(e) {
    // const {fields,isDirty} =this.state;
    // fields[field]=value;
    // isDirty[field]=true;
    // this.setState({fields,isDirty},()=>{
    //   this.validateForm();
    // });
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    console.log("value",e.target.value) 
    this.setState({
      fields
    },()=>{this.validateForm()});
    console.log(this.state.fields)
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    console.log("Submitiing")
    // console.log(this.state.status)
    if (this.validateForm()) {
      let fields = {};
      // console.log("HEllo")
      console.log("Username :", this.state.fields.name);
      console.log("Speciality :");
      console.log("Experience :", this.state.fields.experience);
      console.log("Consulting Fees :", this.state.fields.fees);
      console.log("Qualification :", this.state.fields.qualification);
      console.log("Practising At :", this.state.fields.location);
      console.log("Language :", this.state.fields.language);
      console.log("EMail :", this.state.fields.emailid);
      console.log("Phone :", this.state.fields.phone);
      console.log("Gender :", this.state.fields.gender);
      console.log("Medical Registration Number :", this.state.fields.regno);
      console.log("Graduation :", this.state.fields.graduation);
      console.log("Specialization :", this.state.fields.specialization);
      console.log("Super-Specialization :", this.state.fields.supSpecialization);
      fields["username"] = "";
      fields["speciality"] = "";
      fields["experience"] = "";
      fields["fees"] = "";
      fields["qualification"] = "";
      fields["location"] = "";
      fields["language"] = "";
      fields["emailid"] = "";
      fields["phone"] = "";
      fields["gender"] = "";
      fields["regno"] = "";
      fields["graduation"] = "";
      fields["specialization"] = "";
      fields["supSpecialization"] = "";
      this.setState({ fields: fields });
      alert("Form submission complete!");
    }

  }

  validateForm() {
    // const {fields,isDirty,errors}=this.state;
    // Object.keys(fields).forEach((value)=>{
    //   if(value === "username" && isDirty.username){

    //         
    //   }
    // })
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // if (!fields["name"]) {
    //   // console.log("Doc Name",fields['username'])
    //   formIsValid = false;
    //   errors["name"] = "*Please enter the Doctor's full-name.";
    // }

    // if (typeof fields["name"] !== "undefined") {
    //   console.log("Doc Name:", fields['name'])
    //   // console.log(this.state.fields.name?.full || "")
    //   if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["name"] = "*Please enter doctor's full name(alphabet characters only).";
    //   }
    // }

    // if(!fields["speciality"]){
    //   formIsValid = false;
    //   errors["speciality"] = "*Please select the Doctor's Speciality"
    // }

    if (typeof fields["experience"] !== "undefined") {
      if (!fields["experience"].toString().match(/^[0-9]{1,2}$/)) {
        formIsValid = false;
        errors["experience"] = "*Please enter a valid Experience";
      }
    }

    if (typeof fields["fee"] !== "undefined") {
      if (!fields["fee"].toString().match(/^[0-9]{5}$/)) {
        formIsValid = false;
        errors["fee"] = "*Please enter valid Amount";
      }
    }

    if(typeof fields["qualification"] !== "undefined"){
      if(!fields["qualification"].match(/^[a-zA-Z]*$/)){
        formIsValid=false;
        errors["qualification"] = "*Please enter a valid qualification";
      }
    }

    if (!fields["location"]) {
      formIsValid = false;
      errors["location"] = "*Please enter the practising location"
    }

    // if(!["language"].length? formIsValid: false){
    //   // formIsValid = false;
    //   errors["language"] = "*Please select at least one languages"
    // }

    // if (typeof fields["email"] !== "undefined") {
    //   //regular expression for email validation
    //   // var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/);
    //   if (!fields["email"].match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$/)) {
    //     formIsValid = false;
    //     errors["email"] = "*Please enter valid email-ID.";
    //   }
    // }

    if (typeof fields["phone"] !== "undefined") {
      if (!fields["phone"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phone"] = "*Please enter valid mobile no.";
      }
    }

    // if(!fields["gender"]){
    //   formIsValid = false;
    //   errors["gender"] = "*Please select the gender"
    // }

    if (typeof fields["registrationNumber"] !== "undefined") {
      if(!fields["registrationNumber"].match(/^[a-zA-Z]*$/)){
      formIsValid = false;
      errors["registrationNumber"] = "*Please enter a valid Medical Registration Number"
    }
  }

    if (typeof fields["specialty"] !== "undefined") {
      if(!fields["specialty"].match(/^[a-zA-Z]*$/)){
      formIsValid = false;
      errors["specialty"] = "*Please enter a valid specialization"
    }
  }

    if (typeof fields["superSpecialty"] !== "undefined") {
      if(!fields["superSpecialty"].match(/^[a-zA-Z]*$/)){
      formIsValid = false;
      errors["superSpecialty"] = "*Please enter the valid super-specialization"
    }
  }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div id="main-registration-container">
        <div id="register">
          {this.state.status === true &&
            <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
              <label><strong>Name :</strong></label>
              <input type="text" name="name" value={this.state.fields.name?.full || ""} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.name}</div>

              {/* <label><strong> Speaciality(FIX) :</strong></label>
              <select onChange={this.handleChange} value={this.state.fields._specialty?.name || ""}>
                <option value=""></option>
                <option value="">Speciality2</option>
                <option value="">Speciality3</option>
              </select>
              <div className="errorMsg">{this.state.errors._specialty?.name || ""}</div> */}

              <label><strong> Experience :</strong></label>
              <input type="number" name="experience" value={this.state.fields.experience} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.experience}</div>

              <label><strong> Consult Fees :</strong></label>
              <input type="number" name="fee" value={this.state.fields.fee} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.fee}</div>

              <label><strong> Qualification :</strong></label>
              <input type="text" name="qualification" value={this.state.fields.qualification} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.qualification}</div>

              <label><strong> Practising At :</strong></label>
              <input type="text" name="location" value={this.state.fields.location?.city || ""} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.location}</div>

              <label><strong> Languages known(FIX) :</strong></label>
              <table>
                <tbody>
                  <tr>
                    <td >HINDI</td>
                    <td className="gender"><input type="checkbox" name="hindi" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td >ENGLISH</td>
                    <td className="gender"><input type="checkbox" name="english" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>BENGALI</td>
                    <td className="gender"><input type="checkbox" name="bengali" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>ORIYA</td>
                    <td className="gender"><input type="checkbox" name="oriya" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>ASSAMESE</td>
                    <td className="gender"><input type="checkbox" name="assamese" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>GUJRATI</td>
                    <td className="gender"><input type="checkbox" name="gujrati" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>MARATHI</td>
                    <td className="gender"><input type="checkbox" name="marathi" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>TELUGU</td>
                    <td className="gender"><input type="checkbox" name="telugu" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>TAMIL</td>
                    <td className="gender"><input type="checkbox" name="tamil" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>PUNJABI</td>
                    <td className="gender"><input type="checkbox" name="punjabi" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>MALAYALAM</td>
                    <td className="gender"><input type="checkbox" name="malayalam" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>KANNADA</td>
                    <td className="gender"><input type="checkbox" name="kannada" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                </tbody>
              </table>
              <div className="errorMsg">{this.state.errors.language}</div>

              <label><strong> Email :</strong></label>
              <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.email}</div>

              <label><strong> Phone :</strong></label>
              <input type="text" name="phone" value={this.state.fields.phone} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.phone}</div>

              <label><strong> Gender(FIX) :</strong></label>
              <table>
                <tbody>
                  <tr>
                    <td>Male</td>
                    <td className="gender"><input type="radio" name="gender" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Female</td>
                    <td className="gender"><input type="radio" name="gender" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Other</td>
                    <td className="gender"><input type="radio" name="gender" value={this.state.fields} onChange={this.handleChange} /></td>
                  </tr>
                </tbody>
              </table>
              <div className="errorMsg">{this.state.errors.gender}</div>

              <label><strong> Medical Registration Number :</strong></label>
              <input type="text" name="registrationNumber" value={this.state.fields.registrationNumber} onChange={this.handleChange} />
              <div className="errorMsg">{this.state.errors.registrationNumber}</div>

              {/* <label><strong> Graduation :</strong></label>
              <textarea type="text" name="graduation" value={this.state.fields.qualification} onChange={this.handleChange} ></textarea>
              <div className="errorMsg">{this.state.errors.graduation}</div> */}

              <label><strong> Specialization :</strong></label>
              <textarea type="text" name="specialty" value={this.state.fields.specialty} onChange={this.handleChange} ></textarea>
              <div className="errorMsg">{this.state.errors.specialty}</div>

              <label><strong> Super Specialization :</strong></label>
              <textarea type="text" name="superSpeciality" value={this.state.fields.superSpeciality} onChange={this.handleChange} ></textarea>
              <div className="errorMsg">{this.state.errors.superSpeciality}</div>

              <input type="submit" className="button" value="Submit Data" />
            </form>
          }
        </div>
      </div>

    );
  }


}


export default Form;