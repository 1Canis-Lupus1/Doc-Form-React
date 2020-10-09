import React, {Component} from "react";
import "./form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        speciality: "",

      },
      isTrue: {
        name: "",
        speciality: "",
        experience: "",
        consultFees: "",
        qualification: "",
        location: "",
        lang: [],
        email: "",
        phone: "",
        gender: "",
        regNo: "",
        specialize: "",
        superSpecilize: "",
      },
      docData: {
        name: "",
        speciality: "",
        experience: "",
        consultFees: "",
        qualification: "",
        location: "",
        lang: [],
        email: "",
        phone: "",
        gender: "",
        regNo: "",
        specialize: "",
        superSpecilize: "",
      },
      errors: {},
      hasCharError: false,
      attachToken: true,
      specialities: [],
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    const docs = `http://178.128.127.115:3000/admin/v1/user/doc/5ede37431a52c86dba7f0051`;
    const docsSpeciality = `http://178.128.127.115:3000/admin/v1/specialties`;
    this.getDoctorDeatils(docs, this.state.attachToken);
    this.getDoctorSpeciality(docsSpeciality, this.state.attachToken);
  }

  getDoctorDeatils(docs, attachToken) {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (attachToken) {
      try {
        const authToken =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMTk4Mjk3MiwiZXhwIjoxNjA0NTc0OTcyfQ.rnyN3M76h7xlzrZsY9gcIXa968uMcrW1J0o_GQzw-P0";
        if (authToken) {
          console.log(authToken);
          headers["Authorization"] = authToken;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return new Promise((resolve, reject) => {
      try {
        fetch(docs, {
          method: "GET",
          headers: headers,
        })
          .then((res) => res.json())
          .then((jsonResponse) => {
            if (jsonResponse.error === false) {
              // console.log(jsonResponse);
              let details = jsonResponse.doctor;
              console.log("Doctor Detail: ", details);
              this.setState({
                docData: {
                  name: details.name.full,
                  speciality: details._specialty.id,
                  experience: details.experience,
                  consultFees: details.fee,
                  qualification: details.qualification,
                  location: details.clinicOrHospitalName,
                  lang: details.languages,
                  email: details.email,
                  phone: details.phone,
                  gender: details.gender,
                  regNo: details.registrationNumber,
                  specialize: details.specialty,
                  superSpecilize: details.superSpeciality,
                }
              });
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          })
          .catch((e) => {
            console.log("XHR GET Error: ", e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  }

  getDoctorSpeciality(docs, attachToken) {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (attachToken) {
      try {
        const authToken =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMTk4Mjk3MiwiZXhwIjoxNjA0NTc0OTcyfQ.rnyN3M76h7xlzrZsY9gcIXa968uMcrW1J0o_GQzw-P0";
        if (authToken) {
          console.log(authToken);
          headers["Authorization"] = authToken;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return new Promise((resolve, reject) => {
      try {
        fetch(docs, {
          method: "GET",
          headers: headers,
        })
          .then((res) => res.json())
          .then((jsonResponse) => {
            if (jsonResponse.error === false) {
              console.log("Specialties Data: ", jsonResponse);
              resolve(jsonResponse);
              let speciality = jsonResponse.specialties.map((e) => {
                console.log(e.name)
                return e.name
              })
              this.setState({
                specialities: speciality
              })
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          })
          .catch((e) => {
            console.log("XHR GET Error: ", e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  }

  handleChange = (field, value) => {
    console.log(field, value);
    const { docData, isTrue } = this.state;
    if (field === 'languages') {
      if (value.checked) {
        docData[field].push(value.value)
      } else {
        docData[field].splice(docData[field].indexOf(value.value), 1)
      }
    } else {
      docData[field] = value;
    }
    isTrue[field] = true
    this.setState({ docData, isTrue }, () => {
      this.validateForm();
      console.log(this.state)
    });

    if (!value && typeof value === 'number') {
      docData[field] = '';
      isTrue[field] = true;
      this.setState({ docData, isTrue }, () => {
        this.validateForm();
        console.log(this.state)
      });
      return;
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    let isTrue = {
      name: true,
      speciality: true,
      experience: true,
      consultFees: true,
      qualification: true,
      practisingAt: true,
      lang: true,
      email: true,
      phone: true,
      gender: true,
      regNo: true,
      graduation: true,
      specialization: true,
      superSpecialization: true,
    };
    this.setState({ isTrue }, () => {
      let errors = this.validateForm();
      console.log(errors);
      if (!errors) {
        const { docData } = this.state;
        console.log("Final API call: ", docData);
      }
    });
  };

  validateForm() {
    const { docData, isTrue, errors } = this.state;
    Object.keys(docData).forEach((each) => {
      switch (each) {
        case 'name': {
          if (isTrue.name) {
            if (docData.name.length < 3) {
              errors[each] = "*Please enter a valid name";
            }
            if (!docData.name.length) {
              errors[each] = "*Required";
            } else {
              delete errors[each];
              isTrue.name = false;
            }
          }
          break;
        }
        case 'speciality': {
          if (isTrue.speciality) {
            if (!docData.speciality.trim().length) {
              errors[each] = "*Please select the speciality";
            } else {
              delete errors[each];
              isTrue.speciality = false;
            }
          }
          break;
        }
        case 'experience': {
          if (isTrue.experience) {
            if (docData.experience < 0) {
              errors[each] = "*Please Enter a valid experience";
            } if (!docData.experience) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.experience = false;
            }
          }
          break;
        }
        case 'consultFees': {
          if (isTrue.consultFees) {
            if (docData.consultFees < 0) {
              errors[each] = "*Please Enter a valid Fees";
            } if (!docData.consultFees) {
              errors[each] = "* Please fill above field";
            } else {
              delete errors[each];
              isTrue.consultFees = false;
            }
          }
          break;
        }
        case 'qualification': {
          if (isTrue.qualification) {
            if (!docData.qualification.trim().length) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.qualification = false;
            }
          }
          break;
        }
        case 'practisingAt': {
          if (isTrue.practisingAt) {
            if (!docData.practisingAt.trim().length) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.practisingAt = false;
            }
          }
          break;
        }
        case 'phone': {
          if (isTrue.phone) {
            if ((docData.phone).toString().length < 10 || (docData.phone).toString().length > 10) {
              errors[each] = "*Please Enter a valid phone number";
            } else {
              if (!docData.phone) {
                errors[each] = "*Please fill above field";
              }
              delete errors[each];
              isTrue.phone = false;
            }
          }
          break;
        }
        case 'email': {
          if (isTrue.email) {
            if (
              docData.email.trim().length &&
              !new RegExp(
                "^[a-zA-Z0-9]{1}[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$"
              ).test(docData.email)
            ) {
              errors.email = "*Invalid Email";
            }
            if (!docData.email.trim().length) {
              errors.email = "* Please fill above field";
            } else {
              delete errors[each];
              isTrue.email = false;
            }
          }
          break;
        }
        case 'gender': {
          if (isTrue.gender) {
            if (!docData.gender.trim().length) {
              errors[each] = "*Please select a gender";
            } else {
              delete errors[each];
              isTrue.gender = false;
            }
          }
          break;
        }
        case 'regNo': {
          if (isTrue.regNo) {
            if (!docData.regNo.trim().length) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.regNo = false;
            }
          }
          break;
        }
        case 'graduation': {
          if (isTrue.graduation) {
            if (!docData.graduation.trim().length) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.graduation = false;
            }
          }
          break;
        }
        case 'specialization': {
          if (isTrue.specialization) {
            if (!docData.specialization.trim().length) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.specialization = false;
            }
          }
          break;
        }
        case 'superSpecialization': {
          if (isTrue.superSpeciallization) {
            if (!docData.superSpecialization.trim().length) {
              errors[each] = "*Please fill above field";
            } else {
              delete errors[each];
              isTrue.superSpecialization = false;
            }
          }
          break;
        }
        default: {
          console.log("Error in validation_switch_case ");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }


  render() {
    const { docData, specialities, errors } = this.state;
    return (
      <React.Fragment>
        <section className='d-flex justify-content-center'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div className='form-group'>
                <label htmlFor='Doctor Name'>Name</label>
                <input
                  id="nameInput"
                  type='text'
                  name="name"
                  value={docData.name}
                  placeholder="Enter Name"
                  onChange={(e) =>
                    this.handleChange("name", e.target.value)
                  }
                />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.name}
                    </small>
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='Speciality'>Speciality</label>
                <select

                  className='form-control'
                  id='specialtyInput'
                  name='specialty'
                  onChange={(e) => this.handleChange("specialty", e.target.value)}>

                  {specialities.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.specialty}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label htmlFor=''>Experience</label>
                <input type='number' id="experienceInput" name="experience" value={docData.experience} min={0}
                  onChange={(e) =>
                    this.handleChange("experience", parseInt(e.target.value))
                  }
                />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.experience}
                    </small>
                  </div>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor=''>Consult Fees</label>
                <input type='number' id="consultFeesInput" name='consultFees' value={docData.consultFees} min={0}
                  onChange={(e) =>
                    this.handleChange("consultFees", parseInt(e.target.value))
                  }
                />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.consultFees}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label htmlFor=''>Qualification</label>
                <input type='text' id="qualificationInput" name="qualification" value={docData.qualification}
                  onChange={(e) =>
                    this.handleChange("qualification", e.target.value.trim())
                  }
                />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.qualification}
                    </small>
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor=''>Practising At</label>
                <input type='text' name="practisingAt" value={docData.location}
                  onChange={(e) =>
                    this.handleChange("practisingAt", e.target.value.trim())
                  }
                />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.location}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor=''>Languages</label>
              </div>
              <div>
                <div className='form-check-inline'>
                  <label className='form-check-label' >
                    <input
                      id='LH'
                      type='checkbox'
                      className='form-check-input'
                    />Hindi</label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                    />English</label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                    />Bengali </label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                    />Telugu</label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                    />Gujrati</label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'/>Tamil
                   </label>
                </div>
                </div>
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.lang}</small>
                  </div>
                )}
              <div className='form-group'>
                <label htmlFor=''>Email</label>
                <input type='email' name="email" value={docData.email}
                  onChange={(e) =>
                    this.handleChange("email", e.target.value.trim())
                  } />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.email}
                    </small>
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor=''>Phone</label>
                <input type='number' name="phone" value={docData.phone}
                  onChange={(e) =>
                    this.handleChange("phone", parseInt(e.target.value))
                  } />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.phone}
                      {/* * Please fill above field */}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor=''>Gender</label>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      name="gender"
                      value="Male"
                      checked={docData.gender === "Male" ? true : false}

                      onChange={(e) =>
                        this.handleChange("gender", e.target.value)
                      }
                    />Male</label>
                </div>
                <div className='form-check-inline'>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      name="gender"
                      value="Female"
                      checked={docData.gender === "Female" ? true : false}
                      onChange={(e) =>
                        this.handleChange("gender", e.target.value)
                      }
                    />Female</label>
                </div>
              </div>
              <div>
                <label htmlFor=''>
                  Medical Registration Number</label>
                <input type='text' name="regNo" value={docData.regNo} min={0}
                  onChange={(e) =>
                    this.handleChange("regNo", e.target.value.trim())
                  } />
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.regNo}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label htmlFor='comment'>Graduation</label>
                <textarea
                  name="text"
                  className='form-control'
                  rows='5'
                  id='comment' value={docData.qualification} onChange={(e) =>
                    this.handleChange("graduation", e.target.value.trim())
                  }></textarea>
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.qualification}
                    </small>
                  </div>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='comment'>Specialization</label>
                <textarea
                  name="text"
                  className='form-control'
                  rows='5'
                  id='comment' value={docData.specialize}
                  onChange={(e) =>
                    this.handleChange("specialization", e.target.value.trim())
                  }></textarea>
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.specialize}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label htmlFor='comment'>
                  Super Specialization
                                </label>
                <textarea
                  name="text"
                  className='form-control'
                  rows='5'
                  id='comment' value={this.state.docData.superSpecilize}
                  onChange={(e) =>
                    this.handleChange("superSpecialize", e.target.value.trim())
                  }></textarea>
                {errors && (
                  <div>
                    <small style={{ color: "red" }}>
                      {errors.superSpecilize}
                    </small>
                  </div>
                )}
              </div>
            </div>
            <hr />
            <button>Save</button>
          </form>
        </section>
      </React.Fragment>
    );
  }
}
export default Form;
