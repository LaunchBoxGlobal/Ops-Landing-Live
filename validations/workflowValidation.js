import * as Yup from "yup";

export const step1Schema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  phone: Yup.string().required("Required"),
});

export const step2Schema = Yup.object({
  tools: Yup.array().min(1, "Select at least one tool").required(),
  problems: Yup.array().min(1, "Select at least one problem").required(),
});

export const step3Schema = Yup.object({
  solutionType: Yup.string().required("Required"),
  timeline: Yup.string().required("Required"),
  budget: Yup.string().required("Required"),
  notes: Yup.string(),
});
