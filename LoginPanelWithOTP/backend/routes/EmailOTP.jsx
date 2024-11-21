const handleOTP = async (req, res) => {
  const { email } = req.body;

  transporter.sendMail(
    {
      from: `Naukri App <${process.env.EMAIL_USER}>`,
      to: ` ${email}`,
      subject: "Web Developer Position",
      html: `<p>Dear Applicant,
      </p>
      
      <p>
      We have received your Job Application on Naukri portal “Internship” in “MERN Developer”, As per our selection process you need to first complete a Machine test and based on the output of Machine test, shortlisted applicants will be called for Face to Face interview at our Whitefield, Bangalore office.
      </p>
      <p>
      Please find the attached MERN machine test. This test needs to be completed by you and is to be submitted back by 21-11-2024 at 10 AM, on this email ID only.
      </p>
       
      <h3>
      Note – You have to submit the file having your code and video of the task to be shared, of the code output that you have compiled. Also upload the code file in Github and share your Github account details to access the code in Github.
      </h3>
      
      <h4>
      2. This is a 6(six) months internship offer for which candidates shortlisted on the basis of this test, will be called for face to face interview at our White Field-Bangalore office. This is a work from office internship at our Whitefield- Bangalore Office and “No” virtual task is involved in it.
      </h4>
      
      <p>
      Please feel free to connect on the below given email ID for any queries. 
      </p>
      <p>
      
      Regards
      </p>
      <p>
      Team HR
      </p>`,
    },
    (error, info) => {
      if (error) {
        console.log("Error occured :-", error);
      } else {
        console.log("Email send successfully", info.messageId);
      }
    }
  );
  res.send("Jai Shree Ram");
};
