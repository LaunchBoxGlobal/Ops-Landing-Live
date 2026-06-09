"use client";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import TimezoneSelect from "react-timezone-select";
import Select from "react-select";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { usePathname } from "next/navigation";
import PhoneNumberField from "./PhoneNumberField";

export const serviceLinks = [
  "Mobile App Development",
  "Web App Development",
  "Software Project Rescue Service",
  "Custom Software Development",
  "E-commerce Development",
  "Digital Marketing",
  "Branding & Design",
  "Native App Development",
  "Flutter App Development",
  "Swift App Development",
  "Kotlin App Development",
  "Ionic App Development",
  "Team Augmentation",
  "On-Demand Talent Augmentation",
  "Off-Shore Software Development",
];

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const pathname = usePathname();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      service: "",
      email: "",
      phoneNumber: "",
      description: "",
      timezone: "",
      emailSubject: "New Contact Form Website",
      agreeToTermsConditions: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("First name is required"),
      service: Yup.string().required("Please select a service"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .test("is-valid-phone", "Invalid phone number", (value) =>
          value ? isValidPhoneNumber(value) : false,
        ),
      description: Yup.string().max(
        500,
        "Description cannot exceed 500 characters",
      ),
      agreeToTermsConditions: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions",
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const phoneNumber = parsePhoneNumberFromString(values.phoneNumber);

        const formattedPhoneNumber = phoneNumber
          ? phoneNumber.formatInternational()
          : values.phoneNumber;
        const payload = {
          firstName: values.firstName,
          service: values.service,
          email: values.email,
          phoneNumber: formattedPhoneNumber,
          description: `Service: ${values.service} / Time Zone: ${values.timezone} / Message: ${values.description}`,
          timezone: values.timezone,
          emailSubject: values.emailSubject,
          agreeToTermsConditions: values.agreeToTermsConditions,
          pageUrl: pathname,
        };

        const res = await axios.post(`/api/submit-form`, payload, {
          headers: { "Content-Type": "application/json" },
        });

        if (res?.status === 200) {
          resetForm();
          alert("Form submitted successfully!");
        }
      } catch (error) {
        console.log("FORM SUBMISSION ERROR >> ", error);
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        setSelectedTimezone({ value: tz, label: tz });
        formik.setFieldValue("timezone", tz, false);
      }
    } catch (e) {
      console.warn("Timezone detection failed:", e);
    }
  }, []);

  return (
    <section className="w-full pb-10 lg:pb-20 padding-x flex items-center justify-center relative overflow-hidden">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full lg:w-[70%] 2xl:w-[60%] flex flex-col items-start gap-6 z-10 pb-10"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="firstName"
              className="block text-sm lg:text-lg font-medium text-gray-900"
            >
              Who's the genius behind the idea?
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Your full name"
              name="firstName"
              {...formik.getFieldProps("firstName")}
              className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:outline-[#f40e00] focus:ring-[#F40E00] focus:border-[#F40E00] block w-full p-3.5 opacity-60 placeholder:text-gray-600"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="service"
              className="block text-sm lg:text-lg font-medium text-gray-900"
            >
              Pick the service you'd like to start with.
            </label>

            <Select
              id="service"
              name="service"
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "100%",
                  padding: "2px 0",
                }),
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#f9fafb", // bg-gray-50
                  borderColor: state.isFocused ? "#F40E00" : "#d1d5db",
                  boxShadow: state.isFocused ? "0 0 0 1px #F40E00" : "none",
                  borderRadius: "0.5rem", // rounded-lg
                  minHeight: "45px",
                  fontSize: "0.875rem", // text-sm
                  width: "100%",
                  color: "#111827",
                  opacity: 0.9,
                  "&:hover": { borderColor: "#F40E00" },
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 20,
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#F40E00" : "white",
                  color: state.isFocused ? "white" : "#111827",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#111827",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#6b7280",
                }),
              }}
              options={serviceLinks.map((service) => ({
                value: service,
                label: service,
              }))}
              placeholder="Choose a service"
              value={
                serviceLinks
                  .map((s) => ({ value: s, label: s }))
                  .find((option) => option.value === formik.values.service) ||
                null
              }
              onChange={(selectedOption) =>
                formik.setFieldValue("service", selectedOption?.value)
              }
              onBlur={() => formik.setFieldTouched("service", true)}
            />

            {formik.touched.service && formik.errors.service && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.service}
              </div>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="email"
              className="block text-sm lg:text-lg font-medium text-gray-900"
            >
              Best place to send your plan?
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              {...formik.getFieldProps("email")}
              className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:outline-[#f40e00] focus:ring-[#F40E00] focus:border-[#F40E00] block w-full p-3.5 opacity-60"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <PhoneNumberField
            formik={formik}
            label={"Where can we reach you directly?"}
          />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-start gap-1">
            <label
              htmlFor="timezone"
              className="block text-sm lg:text-lg font-medium text-gray-900"
            >
              We’ll sync to your time zone.
            </label>

            <div className="w-full">
              <TimezoneSelect
                value={selectedTimezone}
                onChange={(tz) => {
                  setSelectedTimezone(tz);
                  formik.setFieldValue("timezone", tz.value);
                }}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    width: "100%",
                    padding: "2px 0",
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    width: "100%",
                    backgroundColor: "#f9fafb",
                    borderColor: state.isFocused ? "#F40E00" : "#d1d5db",
                    boxShadow: state.isFocused ? "0 0 0 1px #F40E00" : "none",
                    borderRadius: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.875rem",
                    color: "#111827",
                    opacity: 1,
                    "&:hover": {
                      borderColor: "#F40E00",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 20,
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "#F40E00" : "white",
                    color: state.isFocused ? "white" : "#111827",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#111827",
                  }),
                }}
              />
            </div>

            {formik.touched.timezone && formik.errors.timezone && (
              <div className="text-red-500 text-sm">
                {formik.errors.timezone}
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-start gap-1">
            <label
              htmlFor="description"
              className="block text-sm lg:text-lg font-medium text-gray-900"
            >
              Tell us about your idea in one line.{" "}
              <span className="text-xs text-gray-400">{`(Optional)`}</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="ex: A subscription app for healthy meal plans"
              {...formik.getFieldProps("description")}
              className="shadow-xs bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:outline-[#f40e00] focus:ring-[#F40E00] focus:border-[#F40E00] block w-full p-3.5 opacity-60 placeholder:text-gray-600"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-start gap-2">
            <input
              // type="checkbox"
              // name="agreeToTermsConditions"
              // id="agreeToTermsConditions"
              // {...formik.getFieldProps("agreeToTermsConditions")}
              type="checkbox"
              name="agreeToTermsConditions"
              id="agreeToTermsConditions"
              checked={formik.values.agreeToTermsConditions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="agreeToTermsConditions"
              className="leading-[1.3] text-sm relative -top-0.5"
            >
              By checking this box, I agree to receive marketing and support SMS
              from LaunchBox Global at the phone number provided. Consent is not
              a condition of purchase. Msg & data rates may apply. Msg frequency
              varies. For help, reply HELP or email us at
              hello@launchboxglobal.com. You can opt out at any time by replying
              STOP. View our{" "}
              <Link href={`/privacy-policy`} className="underline mx-1">
                Privacy & Policy
              </Link>{" "}
              &{" "}
              <Link href={`/terms-and-conditions`} className="underline mx-1">
                Terms and Conditions.
              </Link>{" "}
            </label>
          </div>
          {formik.touched.agreeToTermsConditions &&
            formik.errors.agreeToTermsConditions && (
              <span className="text-red-500 text-sm pl-5">
                {formik.errors.agreeToTermsConditions}
              </span>
            )}
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-3 gap-5">
          <button
            type="submit"
            className="bg-[#F40E00] text-white px-5 min-w-[223px] lg:px-7 py-4 2xl:py-8 font-bold rounded-xl flex items-center justify-center gap-2 text-sm lg:text-lg 2xl:text-[25px]"
          >
            {loading
              ? "Booking Strategy Call"
              : "Book My Free Strategy Call (Worth $1,000)"}
          </button>
          <p
            className="text-[#F40E00] font-normal text-sm lg:text-lg lg:w-[35%] text-center"
            style={{ lineHeight: "1.4rem" }}
          >
            Your personalized plan will be shared after the discovery call.
          </p>
        </div>
      </form>
    </section>
  );
};

export default ContactUsForm;
