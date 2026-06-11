"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import PhoneNumberField from "./PhoneNumberField";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

// Initial values for Formik
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  companySize: "",
  tools: [],
  problems: [],
  solutionType: "",
  timeline: "",
  budget: "Prefer not to say",
  notes: "",
};

// Yup schemas for each step validation
const stepOneSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(40, "Too long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(40, "Too long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid work email")
    .required("Work email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .test("is-valid-phone", "Please enter a valid phone number", (value) => {
      if (!value) return false;
      try {
        return isValidPhoneNumber(value);
      } catch {
        return false;
      }
    }),
  companyName: Yup.string()
    .min(2, "Too short")
    .required("Company name is required"),
  companySize: Yup.string().required("Please select your company size"),
});

const stepTwoSchema = Yup.object().shape({
  tools: Yup.array()
    .min(1, "Please select at least one tool you currently use")
    .required("Tools selection is required"),
  problems: Yup.array()
    .min(1, "Please select at least one operational challenge you face")
    .required("Problem selection is required"),
});

const stepThreeSchema = Yup.object().shape({
  solutionType: Yup.string()
    .required("Please select a solution type")
    .notOneOf(["", "Select one"], "Please select a solution type"),
  timeline: Yup.string()
    .required("Please select a start timeline")
    .notOneOf(["", "Select timeline"], "Please select when you want to start"),
  budget: Yup.string().required("Please select your approximate budget"),
  notes: Yup.string().max(1000, "Notes are too long (maximum 1000 characters)"),
});

// Options for Step 2 Tools Questions
const OPERATIONAL_TOOLS = [
  "Spreadsheets / Excel",
  "WhatsApp / Email",
  "Accounting software",
  "Off-the-shelf SaaS",
  "Older custom system",
  "ERP (SAP, Odoo, etc.)",
  "Paper / Manual processes",
  "Nothing formal yet",
];

// Options for Step 2 Operational Problems Questions
const OPERATIONAL_PROBLEMS = [
  "No central system — everything is scattered",
  "Manual work eating our team's time",
  "No real-time visibility on jobs or teams",
  "Reporting is slow or unreliable",
  "Current software doesn't fit our workflow",
  "Scaling is creating chaos",
  "Customer experience is suffering",
];

export default function WorkflowAuditForm({
  isModalOpen,
  setIsModalOpen,
  step,
  setStep,
  isSubmitted,
  setIsSubmitted,
  openModal,
}) {
  const [submissionData, setSubmissionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentSchema =
    step === 1 ? stepOneSchema : step === 2 ? stepTwoSchema : stepThreeSchema;

  // Validate step fields manually before allowing progress
  const validateStepAndGoNext = async (formik) => {
    const errors = await formik.validateForm();

    let fieldsToTouch = [];
    if (step === 1) {
      fieldsToTouch = [
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "companyName",
        "companySize",
      ];
    } else if (step === 2) {
      fieldsToTouch = ["tools", "problems"];
    } else if (step === 3) {
      fieldsToTouch = ["solutionType", "timeline", "budget"];
    }

    // Set all fields in this step as touched to trigger CSS highlighting and error messages
    fieldsToTouch.forEach((f) => {
      formik.setFieldTouched(f, true, true);
    });

    const hasErrors = fieldsToTouch.some((f) => !!errors[f]);

    if (!hasErrors) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Trigger manual submission
        formik.submitForm();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const phoneNumber = parsePhoneNumberFromString(values.phoneNumber);

      const formattedPhoneNumber = phoneNumber
        ? phoneNumber.formatInternational()
        : values.phoneNumber;

      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: formattedPhoneNumber,
        companyName: values.companyName,
        companySize: values.companySize,
        tools: values.tools,
        problems: values.problems,
        solutionType: values.solutionType,
        timeline: values.timeline,
        budget: values.budget,
        notes: values.notes,
      };

      // return;

      setIsLoading(true);

      const response = await fetch("/api/workflow-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setSubmissionData(values);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      alert(error.message);
    } finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <div
            id="modal-backdrop"
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeModal}
          >
            {/* Modal Box */}
            <motion.div
              id="modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white w-full max-w-xl md:max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Title with Crimson red bg */}
              <div
                id="modal-header"
                className="bg-[#f40e00] px-6 py-5 relative text-white"
              >
                <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-normal mt-0.5">
                  Book Your Workflow Audit
                </h2>

                {/* Close Button X */}
                <button
                  id="close-modal-x"
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="absolute top-5 right-5 hover:bg-white/10 rounded-lg p-1.5 transition-colors focus:ring-2 focus:ring-red-300 outline-none text-white hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {!isSubmitted ? (
                <Formik
                  initialValues={initialValues}
                  validationSchema={currentSchema}
                  onSubmit={handleFormSubmit}
                >
                  {(formik) => (
                    <Form id="modal-form" className="flex flex-col flex-grow">
                      {/* Tabs step indicator bar */}
                      <div
                        id="step-tabs-bar"
                        className="border-b border-gray-100 bg-slate-50/40 select-none"
                      >
                        <div className="flex text-center">
                          {/* Tab 1 */}
                          <div
                            className={`flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold border-b-2.5 transition-all duration-300 ${
                              step === 1
                                ? "text-[#ab2328] border-[#ab2328] bg-white"
                                : "text-slate-400 border-transparent hover:text-slate-600"
                            }`}
                          >
                            Your details
                          </div>

                          {/* Tab 2 */}
                          <div
                            className={`flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold border-b-2.5 transition-all duration-300 ${
                              step === 2
                                ? "text-[#ab2328] border-[#ab2328] bg-white"
                                : "text-slate-400 border-transparent hover:text-slate-600"
                            }`}
                          >
                            Your operations
                          </div>

                          {/* Tab 3 */}
                          <div
                            className={`flex-1 py-3 text-[11px] sm:text-xs md:text-sm font-bold border-b-2.5 transition-all duration-300 ${
                              step === 3
                                ? "text-[#ab2328] border-[#ab2328] bg-white"
                                : "text-slate-400 border-transparent hover:text-slate-600"
                            }`}
                          >
                            What you need
                          </div>
                        </div>
                      </div>

                      {/* Content Form Scroll Panel */}
                      <div
                        id="modal-body-panel"
                        className="p-6 md:p-8 flex-grow max-h-[60vh] overflow-y-auto"
                      >
                        {/* Step 1: Your details */}
                        {step === 1 && (
                          <motion.div
                            id="step-1-layer"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            {/* Subtitle intro */}
                            <div className="pb-2">
                              <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                                Complete your business info to start your
                                operational diagnostic
                              </h3>
                              <p className="text-xs text-slate-500 mt-1">
                                We protect your data and never sell information.
                                Fields marked with{" "}
                                <span className="text-red-500">*</span> are
                                required.
                              </p>
                            </div>

                            {/* Name split grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <label
                                  htmlFor="firstName"
                                  className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
                                >
                                  First Name{" "}
                                  <span className="text-[#ab2328] ml-0.5">
                                    *
                                  </span>
                                </label>
                                <Field
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  placeholder="Jane"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 ${
                                    formik.errors.firstName &&
                                    formik.touched.firstName
                                      ? "border-red-300 focus:border-red-500"
                                      : "border-slate-200"
                                  }`}
                                />
                                {formik.errors.firstName &&
                                  formik.touched.firstName && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.firstName}
                                    </span>
                                  )}
                              </div>

                              <div className="flex flex-col">
                                <label
                                  htmlFor="lastName"
                                  className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
                                >
                                  Last Name{" "}
                                  <span className="text-[#ab2328] ml-0.5">
                                    *
                                  </span>
                                </label>
                                <Field
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  placeholder="Doe"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 ${
                                    formik.errors.lastName &&
                                    formik.touched.lastName
                                      ? "border-red-300 bg-red-50/20 focus:border-red-500"
                                      : "border-slate-200"
                                  }`}
                                />
                                {formik.errors.lastName &&
                                  formik.touched.lastName && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.lastName}
                                    </span>
                                  )}
                              </div>
                            </div>

                            {/* Contact email & phone split grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <label
                                  htmlFor="email"
                                  className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
                                >
                                  Work Email{" "}
                                  <span className="text-[#ab2328] ml-0.5">
                                    *
                                  </span>
                                </label>
                                <Field
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="jane.doe@company.com"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 ${
                                    formik.errors.email && formik.touched.email
                                      ? "border-red-300 bg-red-50/20 focus:border-red-500"
                                      : "border-slate-200"
                                  }`}
                                />
                                {formik.errors.email &&
                                  formik.touched.email && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.email}
                                    </span>
                                  )}
                              </div>

                              <div className="flex flex-col">
                                <PhoneNumberField
                                  formik={formik}
                                  label={
                                    <>
                                      Phone Number{" "}
                                      <span className="text-[#ab2328] ml-0.5">
                                        *
                                      </span>
                                    </>
                                  }
                                />
                                {/* <label
                                  htmlFor="phone"
                                  className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
                                >
                                  Phone Number{" "}
                                  <span className="text-[#ab2328] ml-0.5">
                                    *
                                  </span>
                                </label>
                                <Field
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  placeholder="+1 (555) 019-2834"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 ${
                                    formik.errors.phone && formik.touched.phone
                                      ? "border-red-300 bg-red-50/20 focus:border-red-500"
                                      : "border-slate-200"
                                  }`}
                                />
                                {formik.errors.phone &&
                                  formik.touched.phone && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.phone}
                                    </span>
                                  )} */}
                              </div>
                            </div>

                            {/* Company detailed inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <label
                                  htmlFor="companyName"
                                  className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
                                >
                                  Company Name{" "}
                                  <span className="text-[#ab2328] ml-0.5">
                                    *
                                  </span>
                                </label>
                                <Field
                                  id="companyName"
                                  name="companyName"
                                  type="text"
                                  placeholder="Acme Systems"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20 ${
                                    formik.errors.companyName &&
                                    formik.touched.companyName
                                      ? "border-red-300 bg-red-50/20 focus:border-red-500"
                                      : "border-slate-200"
                                  }`}
                                />
                                {formik.errors.companyName &&
                                  formik.touched.companyName && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.companyName}
                                    </span>
                                  )}
                              </div>

                              <div className="flex flex-col">
                                <label
                                  htmlFor="companySize"
                                  className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
                                >
                                  Company Size{" "}
                                  <span className="text-[#ab2328] ml-0.5">
                                    *
                                  </span>
                                </label>
                                <Field
                                  id="companySize"
                                  name="companySize"
                                  as="select"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer ${
                                    formik.errors.companySize &&
                                    formik.touched.companySize
                                      ? "border-red-300 bg-red-50/20 focus:border-red-500"
                                      : "border-slate-200"
                                  }`}
                                >
                                  <option value="">Select size</option>
                                  <option value="1-10">1 - 10 employees</option>
                                  <option value="11-50">
                                    11 - 50 employees
                                  </option>
                                  <option value="51-200">
                                    51 - 200 employees
                                  </option>
                                  <option value="201-500">
                                    201 - 500 employees
                                  </option>
                                  <option value="500+">500+ employees</option>
                                </Field>
                                {formik.errors.companySize &&
                                  formik.touched.companySize && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.companySize}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Your operations */}
                        {step === 2 && (
                          <motion.div
                            id="step-2-layer"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                          >
                            {/* Question 1: Tools */}
                            <div>
                              <label
                                id="tools-label"
                                className="font-semibold text-slate-800 text-sm sm:text-base mb-3 block leading-snug"
                              >
                                What tools are you currently using to manage
                                operations?{" "}
                                <span className="text-[#ab2328]">*</span>
                              </label>

                              <div
                                id="tools-options-container"
                                className="flex flex-wrap gap-2 sm:gap-3"
                              >
                                {OPERATIONAL_TOOLS.map((tool) => {
                                  const isSelected =
                                    formik.values.tools.includes(tool);
                                  return (
                                    <button
                                      key={tool}
                                      type="button"
                                      id={`tool-pill-${tool.replace(/\s+/g, "-").toLowerCase()}`}
                                      onClick={() => {
                                        const currentTools = [
                                          ...formik.values.tools,
                                        ];
                                        if (isSelected) {
                                          formik.setFieldValue(
                                            "tools",
                                            currentTools.filter(
                                              (t) => t !== tool,
                                            ),
                                          );
                                        } else {
                                          formik.setFieldValue("tools", [
                                            ...currentTools,
                                            tool,
                                          ]);
                                        }
                                        formik.setFieldTouched("tools", true);
                                      }}
                                      className={`text-xs sm:text-sm font-sans font-medium px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-200 border ${
                                        isSelected
                                          ? "border-[#ab2328] text-[#ab2328] bg-red-50/40 font-semibold"
                                          : "border-slate-200 text-slate-700 bg-[#FAFAFA] hover:bg-slate-50 hover:border-slate-300"
                                      }`}
                                    >
                                      {tool}
                                    </button>
                                  );
                                })}
                              </div>
                              {formik.errors.tools && formik.touched.tools && (
                                <span className="text-xs text-[#ab2328] mt-2 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={12} />{" "}
                                  {formik.errors.tools}
                                </span>
                              )}
                            </div>

                            {/* Question 2: Operational Problems */}
                            <div>
                              <label
                                id="problems-label"
                                className="font-semibold text-slate-800 text-sm sm:text-base mb-3 block leading-snug"
                              >
                                What is the biggest operational problem you are
                                trying to solve?{" "}
                                <span className="text-[#ab2328]">*</span>
                              </label>

                              <div
                                id="problems-options-container"
                                className="flex flex-wrap gap-2 sm:gap-3"
                              >
                                {OPERATIONAL_PROBLEMS.map((prob) => {
                                  const isSelected =
                                    formik.values.problems.includes(prob);
                                  return (
                                    <button
                                      key={prob}
                                      type="button"
                                      id={`prob-pill-${prob.replace(/\s+/g, "-").toLowerCase()}`}
                                      onClick={() => {
                                        const currentProbs = [
                                          ...formik.values.problems,
                                        ];
                                        if (isSelected) {
                                          formik.setFieldValue(
                                            "problems",
                                            currentProbs.filter(
                                              (p) => p !== prob,
                                            ),
                                          );
                                        } else {
                                          formik.setFieldValue("problems", [
                                            ...currentProbs,
                                            prob,
                                          ]);
                                        }
                                        formik.setFieldTouched(
                                          "problems",
                                          true,
                                        );
                                      }}
                                      className={`text-xs sm:text-sm font-sans font-medium px-4 py-2 rounded-full cursor-pointer select-none transition-all duration-200 border text-left ${
                                        isSelected
                                          ? "border-[#ab2328] text-[#ab2328] bg-red-50/40 font-semibold"
                                          : "border-slate-200 text-slate-700 bg-[#FAFAFA] hover:bg-slate-50 hover:border-slate-300"
                                      }`}
                                    >
                                      {prob}
                                    </button>
                                  );
                                })}
                              </div>
                              {formik.errors.problems &&
                                formik.touched.problems && (
                                  <span className="text-xs text-[#ab2328] mt-2 flex items-center gap-1 font-semibold">
                                    <AlertCircle size={12} />{" "}
                                    {formik.errors.problems}
                                  </span>
                                )}
                            </div>

                            <div className="text-center pt-2">
                              <span className="text-xs text-slate-400 font-semibold italic">
                                Select all that apply.
                              </span>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: What you need */}
                        {step === 3 && (
                          <motion.div
                            id="step-3-layer"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            {/* Question 1: Solution type */}
                            <div className="flex flex-col">
                              <label
                                htmlFor="solutionType"
                                className="font-semibold text-slate-800 text-sm sm:text-base mb-2 block"
                              >
                                What type of solution are you looking for?{" "}
                                <span className="text-[#ab2328]">*</span>
                              </label>
                              <Field
                                id="solutionType"
                                name="solutionType"
                                as="select"
                                className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer ${
                                  formik.errors.solutionType &&
                                  formik.touched.solutionType
                                    ? "border-red-300 bg-red-50/20 focus:border-red-500"
                                    : "border-slate-200"
                                }`}
                              >
                                <option value="">Select one</option>
                                <option value="Workflow Automation">
                                  Workflow Automation
                                </option>
                                <option value="Custom Database Hub">
                                  Custom Database Hub
                                </option>
                                <option value="Internal Portal Solution">
                                  Internal Portal Solution
                                </option>
                                <option value="Platform Integration APIs">
                                  Platform Integration APIs
                                </option>
                                <option value="Custom ERP/CRM Platform">
                                  Custom ERP/CRM Platform
                                </option>
                                <option value="Other Operations System">
                                  Other Operations System
                                </option>
                              </Field>
                              {formik.errors.solutionType &&
                                formik.touched.solutionType && (
                                  <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                    <AlertCircle size={12} />{" "}
                                    {formik.errors.solutionType}
                                  </span>
                                )}
                            </div>

                            {/* Split Grid for start timeline and approximate budget */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col">
                                <label
                                  htmlFor="timeline"
                                  className="font-medium text-slate-700 text-sm mb-2 block"
                                >
                                  When are you looking to start?
                                </label>
                                <Field
                                  id="timeline"
                                  name="timeline"
                                  as="select"
                                  className={`w-full border rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer ${
                                    formik.errors.timeline &&
                                    formik.touched.timeline
                                      ? "border-red-300 bg-red-50/20"
                                      : "border-slate-200"
                                  }`}
                                >
                                  <option value="">Select timeline</option>
                                  <option value="Immediately">
                                    Immediately (within 1 month)
                                  </option>
                                  <option value="1-3 Months">1-3 months</option>
                                  <option value="3+ Months">3+ months</option>
                                  <option value="Exploring">
                                    Just exploring / quiet research
                                  </option>
                                </Field>
                                {formik.errors.timeline &&
                                  formik.touched.timeline && (
                                    <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                      <AlertCircle size={12} />{" "}
                                      {formik.errors.timeline}
                                    </span>
                                  )}
                              </div>

                              <div className="flex flex-col">
                                <label
                                  htmlFor="budget"
                                  className="font-medium text-slate-700 text-sm mb-2 block"
                                >
                                  Approximate budget
                                </label>
                                <Field
                                  id="budget"
                                  name="budget"
                                  as="select"
                                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 cursor-pointer"
                                >
                                  <option value="Prefer not to say">
                                    Prefer not to say
                                  </option>
                                  <option value="Under $5k">
                                    Under $5,000
                                  </option>
                                  <option value="$5k-$15k">
                                    $5,000 - $15,000
                                  </option>
                                  <option value="$15k-$50k">
                                    $15,000 - $50,000
                                  </option>
                                  <option value="$50k+">$50,000+</option>
                                </Field>
                              </div>
                            </div>

                            {/* Question 4: Comments textarea */}
                            <div className="flex flex-col">
                              <label
                                htmlFor="notes"
                                className="font-medium text-slate-700 text-sm mb-2 block"
                              >
                                Anything else you want us to know before the
                                call?
                              </label>
                              <Field
                                id="notes"
                                name="notes"
                                as="textarea"
                                rows={4}
                                placeholder="Tell us about your business, what you've already tried, or what a successful outcome looks like for you..."
                                className="w-full border border-slate-200 placeholder-slate-400 rounded-lg px-3.5 py-2.5 bg-[#FAFAFA] text-slate-800 text-sm outline-none transition-all focus:border-red-500 focus:ring-1 focus:ring-red-500/20 resize-none"
                              />
                              {formik.errors.notes && formik.touched.notes && (
                                <span className="text-xs text-[#ab2328] mt-1.5 flex items-center gap-1 font-semibold">
                                  <AlertCircle size={12} />{" "}
                                  {formik.errors.notes}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Sticky Footer Form Panel with buttons and step description */}
                      <div
                        id="modal-bottom-bar"
                        className="p-5 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-4"
                      >
                        <div className="flex items-center justify-between">
                          {/* Back Button */}
                          <div className="w-24">
                            {step > 1 ? (
                              <button
                                type="button"
                                id="back-step-btn"
                                onClick={handleBack}
                                className="border border-slate-200 bg-[#FAFAFA] hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer select-none"
                              >
                                <ArrowLeft size={14} />
                                Back
                              </button>
                            ) : (
                              // Cancel / Dismiss button on page 1
                              <button
                                type="button"
                                id="cancel-form-btn"
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 font-semibold px-4 py-2 text-xs sm:text-sm transition-all cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>

                          {/* Step Counter Text */}
                          <span
                            id="step-counter"
                            className="text-xs sm:text-sm font-semibold text-slate-500 font-sans select-none"
                          >
                            Step {step} of 3
                          </span>

                          {/* Action Button: Next vs Submit */}
                          <div className="text-right">
                            <button
                              type="button"
                              id="next-step-btn"
                              disabled={isLoading}
                              onClick={() => validateStepAndGoNext(formik)}
                              className="w-full bg-[#FAFAFA] border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-800 font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {step < 3 ? (
                                <>
                                  Next
                                  <ArrowRight size={14} />
                                </>
                              ) : (
                                <>
                                  {isLoading ? (
                                    <>Submitting...</>
                                  ) : (
                                    <>
                                      Book My Workflow Audit
                                      <ArrowRight
                                        size={14}
                                        className="flex-shrink-0"
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Fine disclaimer copy under the buttons matching the screenshots */}
                        <div
                          id="spam-disclaimer"
                          className="text-center font-sans"
                        >
                          <p className="text-[10px] sm:text-xs text-slate-500 leading-relaxed font-semibold">
                            No spam. No sales pressure. We’ll reach out within 1
                            business day to confirm your audit time.
                          </p>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                /* High-Fidelity Success UI state */
                <motion.div
                  id="success-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-8 py-20 text-center flex flex-col items-center justify-center space-y-6"
                >
                  <div className="h-16 w-16 rounded-full bg-red-100 text-[#F40E00] flex items-center justify-center animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h3 className="font-bold text-2xl text-red-500">
                      Audit Request Logged!
                    </h3>
                    <p className="text-slate-500 text-base leading-relaxed">
                      Thank you,{" "}
                      <span className="font-bold text-slate-600">
                        {submissionData?.firstName}
                      </span>
                      . Our team of operations engineers has logged your details
                      and is preparing your personalized audit blueprint.
                    </p>
                  </div>

                  {/* Summary recap dashboard inside details modal success state */}
                  {/* <div className="w-full max-w-lg bg-slate-50 border border-slate-100 rounded-xl p-5 text-left space-y-3.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Submitted Parameters
                    </h4>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">
                          Business:
                        </span>
                        <span className="font-bold text-slate-800">
                          {submissionData?.companyName} (
                          {submissionData?.companySize} FTE)
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">
                          Primary Challenge:
                        </span>
                        <span className="font-bold text-slate-800 truncate block">
                          {submissionData?.problems?.[0] || "Unspecified"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">
                          Current Tools:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-0.5 max-h-12 overflow-y-auto">
                          {submissionData?.tools.map((t, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-semibold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">
                          Desired Solution:
                        </span>
                        <span className="font-bold text-slate-800">
                          {submissionData?.solutionType}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 font-semibold italic flex items-center justify-center gap-1.5">
                      <Clock size={14} className="text-slate-500" />
                      We’ll reach out to
                      <span className="text-slate-700 font-semibold">
                        {submissionData?.email}
                      </span>
                      within 1 business day.
                    </p>
                    <button
                      type="button"
                      id="dismiss-success-btn"
                      onClick={closeModal}
                      className="red-bg hover:bg-black transition-all duration-300 text-white font-bold px-10 py-2.5 rounded-[14px] text-lg cursor-pointer select-none"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
