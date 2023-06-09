// // exports.customErrorMessages = {
// //   firstnameErrorMessages: {
// //     required: "First name  is required",
// //     minLength: "First Name should contain minimum 2 characters",
// //     maxLength: "First Name can't contain more than 30 characters",
// //     invalid: "First Name is invalid. Name should contains characters only",
// //   },
// //   lastnameErrorMessages: {
// //     required: "Last name  is required",
// //     minLength: "Last name should contain minimum 2 characters",
// //     maxLength: "Last name can't contain more than 30 characters",
// //     invalid: "Last name is invalid. Name should contains characters only",
// //   },
// //   emailErrorMessages: {
// //     required: "Email id is required",
// //     invalid: "Email id is invalid",

// //     notFound: "Email id not found.",
// //   },
// //   messageErrorMessages: {
// //     required: "Message  is required",
// //     minLength: "Message should contain minimum 2 characters",
// //     maxLength: "Message can't contain more than 100 characters",
// //     invalid: "Message is invalid. Message should contains characters only",
// //   },
// //   orgErrorMessages: {
// //     required: "Organisation  is required",
// //     minLength: "Organisation should contain minimum 2 characters",
// //     maxLength: "Organisation can't contain more than 100 characters",
// //     invalid:
// //       "Organisation is invalid. Organisation should contains characters only",
// //   },
// //   subjectErrorMessages: {
// //     required: "Subject  is required",
// //     minLength: "Subject should contain minimum 2 characters",
// //     maxLength: "Subject can't contain more than 100 characters",
// //     invalid:
// //       "Subject is invalid. Subject should contains characters only",
// //   },
// //   phoneNumberErrorMessages: {
// //     required: "Phone number is required",
// //     minLength: "Phone number should contain minimum of length 10",
// //     maxLength: "Phone number length can't be more than 10.",
// //     invalid: "Phone number is invalid",
// //   },
// // };
// // // ---------------------------------------------------------------------------
// // //Common Method for Catch block Error Handling
// // exports.catchBlockErrorHandler = (error, res) => {
// //   //Mongo DB schema validation Error Handling
// //   if (error.name === "ValidationError") {
// //     let errors = {};

// //     Object.keys(error.errors).forEach((key) => {
// //       errors[key] = error.errors[key].message;
// //     });

// //     return res.status(200).json({
// //       status: "failure",
// //       message: "Form fields validation failed",
// //       errors,
// //     });
// //   }

// //   // Other Errors Handling
// //   return res.status(500).json({
// //     status: "FAILURE",
// //     msg: error?.message ? error.message : "Internal Server Error",
// //   });
// // };

// // ---------------------------------------------------------------------------
// //Common Method for Catch block Error Handling
// export const catchBlockErrorHandler = (error, res) => {
//   //Mongo DB schema validation Error Handling
//   if (error.name === "ValidationError") {
//     let errors = {};

//     Object.keys(error.errors).forEach((key) => {
//       errors[key] = error.errors[key].message;
//     });

//     return res.status(400).json({
//       status: "failure",
//       message: "Form fields validation failed",
//       errors,
//     });
//   }

//   // Other Errors Handling
//   return res.status(500).json({
//     status: "FAILURE",
//     msg: error?.message ? error.message : "Internal Server Error",
//   });
// };
