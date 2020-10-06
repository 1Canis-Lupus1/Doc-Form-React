import React,{Component} from 'react';
import './form.css';


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

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
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

      if(!fields["speciality"]){
        formIsValid = false;
        errors["speciality"] = "*Please select the Doctor's Speciality"
      }

      if(!fields["experience"]){
        formIsValid = false;
        errors["experience"] = "*Please enter the Experience"
      }

      if (typeof fields["experience"] !== "undefined") {
        if (!fields["experience"].match(/^[0-9]{1}$/)) {
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

      if(!fields["language"]){
        formIsValid = false;
        errors["language"] = "*Please select the preferred languages"
      }

      
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
      
      if(!fields["gender"]){
        formIsValid = false;
        errors["gender"] = "*Please select the gender"
      }

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
        <label>Name</label>
        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.username}</div>

        <label>Speaciality(FIX)</label>
        <input type="text" name="speciality" value={this.state.fields.speciality} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.speciality}</div>

        <label>Experience</label>
        <input type="number" name="experience" value={this.state.fields.experience} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.experience}</div>

        <label>Consult Fees</label>
        <input type="number" name="fees" value={this.state.fields.fees} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.fees}</div>

        <label>Qualification</label>
        <input type="text" name="qualification" value={this.state.fields.qualification} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.qualification}</div>

        <label>Practising At</label>
        <input type="text" name="location" value={this.state.fields.location} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.location}</div>

        <label>Languages(FIX)</label>
        <input type="checkbox" name="language" value={this.state.fields.language} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.language}</div>

        <label>Email</label>
        <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div>

        <label>Phone</label>
        <input type="text" name="phone" value={this.state.fields.phone} onChange={this.handleChange}   />
        <div className="errorMsg">{this.state.errors.phone}</div>

        <table>
          <tr>
            <th><label>Gender</label></th>
            <th></th>
          </tr>
          <tr>
            <td>Male</td>
            <td><input type="radio" name="gender" value={this.state.fields.gender} onChange={this.handleChange} /></td>
          </tr>
          <tr>
            <td>Female</td>
            <td><input type="radio" name="gender" value={this.state.fields.gender} onChange={this.handleChange} /></td>
          </tr>
        </table>
        <div className="errorMsg">{this.state.errors.gender}</div>
        
        <label>Medical Registration Number</label>
        <input type="text" name="regno" value={this.state.fields.regno} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.regno}</div>

        <label>Graduation</label>
        <input type="text" name="graduation" value={this.state.fields.graduation} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.graduation}</div>

        <label>Specialization</label>
        <input type="text" name="specialization" value={this.state.fields.specialization} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.specialization}</div>

        <input type="submit" className="button"  value="Submit Data"/>
        </form>
    </div>
</div>

      );
  }


}


export default Form;