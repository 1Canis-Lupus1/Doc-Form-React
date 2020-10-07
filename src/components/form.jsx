import React,{Component} from 'react';
import './form.css';
import {docData} from '../http/http-calls';


class Form extends Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    componentDidMount(){
      const data=docData().then(response=>{
        console.log(response)
        this.setState({
          fields: response
        })
      })
      .catch(error=>console.log(error))
    }

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
      // console.log("Setting the entered values to state...");
      // console.log(this.state.fields.username);
    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          console.log("Username :",this.state.fields.username);
          console.log("Speciality :");
          console.log("Experience :",this.state.fields.experience);
          console.log("Consulting Fees :",this.state.fields.fees);
          console.log("Qualification :",this.state.fields.qualification);
          console.log("Practising At :",this.state.fields.location);
          console.log("Language :",this.state.fields.language);
          console.log("EMail :",this.state.fields.emailid);
          console.log("Phone :",this.state.fields.phone);
          console.log("Gender :",this.state.fields.gender);
          console.log("Medical Registration Number :",this.state.fields.regno);
          console.log("Graduation :",this.state.fields.graduation);
          console.log("Specialization :",this.state.fields.specialization);
          console.log("Super-Specialization :",this.state.fields.supSpecialization);
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
          this.setState({fields:fields});
          alert("Form submission complete!");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter the Doctor's full-name.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }

      // if(!fields["speciality"]){
      //   formIsValid = false;
      //   errors["speciality"] = "*Please select the Doctor's Speciality"
      // }

      if(!fields["experience"]){
        formIsValid = false;
        errors["experience"] = "*Please enter the Experience"
      }

      if (typeof fields["experience"] !== "undefined") {
        if (!fields["experience"].match(/^[0-9]{1,2}$/)) {
          formIsValid = false;
          errors["experience"] = "*Please enter a valid Experience";
        }
      }

      if(!fields["fees"]){
        formIsValid = false;
        errors["fees"] = "*Please enter the consulting fees"
      }

      if (typeof fields["fees"] !== "undefined") {
        if (!fields["fees"].match(/^[0-9]{6}$/)) {
          formIsValid = false;
          errors["fees"] = "*Please enter valid Amount";
        }
      }

      if(!fields["qualification"]){
        formIsValid = false;
        errors["qualification"] = "*Please enter the qualifications"
      }

      if(!fields["location"]){
        formIsValid = false;
        errors["location"] = "*Please enter the practising location"
      }

      // if(!fields["language"]){
      //   formIsValid = false;
      //   errors["language"] = "*Please select the preferred languages"
      // }

      
      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
      }
      
      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
      }
      
      if (!fields["phone"]) {
        formIsValid = false;
        errors["phone"] = "*Please enter your mobile no.";
      }
      
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

      if(!fields["regno"]){
        formIsValid = false;
        errors["regno"] = "*Please enter the medical registration number"
      }

      if (!fields["graduation"]) {
        formIsValid = false;
        errors["graduation"] = "*Please enter the graduation.";
      }

      if(!fields["specialization"]){
        formIsValid = false;
        errors["specialization"] = "*Please enter the specialization"
      }

      if(!fields["supSpecialization"]){
        formIsValid = false;
        errors["supSpecialization"] = "*Please enter the super-specialization"
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
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
        <label><strong>Name :</strong></label>
        <input type="text" name="username" value={this.state.fields} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.username}</div>

        <label><strong> Speaciality(FIX) :</strong></label>
        <select value={this.state.fields} onChange={this.handleChange}>
          <option value="">Speciality1</option>
          <option value="">Speciality2</option>
          <option value="">Speciality3</option>
        </select>
        {/* <input type="dropdown" name="speciality" value={this.state.fields.speciality} onChange={this.handleChange} /> */}
        <div className="errorMsg">{this.state.errors.speciality}</div>

        <label><strong> Experience :</strong></label>
        <input type="number" name="experience" value={this.state.fields} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.experience}</div>

        <label><strong> Consult Fees :</strong></label>
        <input type="number" name="fees" value={this.state.fields} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.fees}</div>

        <label><strong> Qualification :</strong></label>
        <input type="text" name="qualification" value={this.state.fields} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.qualification}</div>

        <label><strong> Practising At :</strong></label>
        <input type="text" name="location" value={this.state.fields} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.location}</div>

        <label><strong> Languages known :</strong></label>
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
        <input type="text" name="emailid" value={this.state.fields} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div>

        <label><strong> Phone :</strong></label>
        <input type="text" name="phone" value={this.state.fields} onChange={this.handleChange}   />
        <div className="errorMsg">{this.state.errors.phone}</div>

        <label><strong> Gender :</strong></label>
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
        <input type="text" name="regno" value={this.state.fields} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.regno}</div>

        <label><strong> Graduation :</strong></label>
        <textarea type="text" name="graduation" value={this.state.fields} onChange={this.handleChange} ></textarea>
        <div className="errorMsg">{this.state.errors.graduation}</div>

        <label><strong> Specialization :</strong></label>
        <textarea type="text" name="specialization" value={this.state.fields} onChange={this.handleChange} ></textarea>
        <div className="errorMsg">{this.state.errors.specialization}</div>

        <label><strong> Super Specialization :</strong></label>
        <textarea type="text" name="supSpecialization" value={this.state.fields} onChange={this.handleChange} ></textarea>
        <div className="errorMsg">{this.state.errors.supSpecialization}</div>

        <input type="submit" className="button"  value="Submit Data"/>
        </form>
    </div>
</div>

      );
  }


}


export default Form;