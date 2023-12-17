import React, {useState} from 'react';

const SuccessAlert = ({message}) => {
    return (
        <div className="alert alert-success" role="alert">
            {message}
        </div>
    );
};

function Contact() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        message: '',
    });

    const [isMessageSent, setIsMessageSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your form submission logic goes here

        // Set isMessageSent to true to show the success alert
        setIsMessageSent(true);

        // Reset form data after submission
        setFormData({
            fullname: '',
            email: '',
            message: '',
        });

        // Reset isMessageSent after a minute (60000 milliseconds)
        setTimeout(() => {
            setIsMessageSent(false);
        }, 60000);
    };

    return (
        /* Contact 1 - Bootstrap Brain Component */
        <section className="bg-light py-3 py-md-5 m-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                        <h2 className="mb-4 display-5 text-center">Contact</h2>
                        <p className="text-secondary mb-5 text-center">Hey, feel free to reach out to our team with any
                            questions or inquiries. We're here to help! We'll do our best to respond to you soon and
                            assist you in any way we can.</p>
                        <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"/>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row justify-content-lg-center">

                    <div className="col-12 col-lg-9">
                        {isMessageSent &&
                            <SuccessAlert message="Your message has been sent! We'll get back to you soon."/>}

                        <div className="bg-white border rounded shadow-sm overflow-hidden">
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                                    <div className="col-12">
                                        <label className="form-label">Full Name <span
                                            className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="fullname" name="fullname"
                                               value={formData.fullname}
                                               onChange={(e) => setFormData({...formData, fullname: e.target.value})}

                                               required/>

                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Email <span
                                            className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="fullname" name="fullname"

                                               value={formData.email}
                                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                                               required/>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="message" className="form-label">Message <span
                                            className="text-danger">*</span></label>
                                        <textarea className="form-control" id="message" name="message" rows="3"
                                                  value={formData.message}
                                                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                  required></textarea>
                                    </div>
                                    {/* ... (other form fields) ... */}
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button className="btn btn-dark btn-lg" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
