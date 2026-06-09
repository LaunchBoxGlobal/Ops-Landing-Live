import { PhoneInput, parseCountry } from "react-international-phone";
import "react-international-phone/style.css";
import "./PhoneNumber.css";

import React from "react";

const PhoneNumberField = ({ formik, label }) => {
  return (
    <div className="flex flex-col items-start">
      {label && (
        <label
          htmlFor="phone"
          className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center"
        >
          {label}
        </label>
      )}

      <PhoneInput
        defaultCountry="us"
        value={formik.values.phoneNumber}
        onChange={(phone) => formik.setFieldValue("phoneNumber", phone)}
        onBlur={() => formik.setFieldTouched("phoneNumber", true)}
        placeholder="Your phone number"
        inputProps={{ id: "phoneNumber", name: "phoneNumber" }}
        countrySelectorStyleProps={{
          buttonStyle: {
            backgroundColor: "#FAFAFA",
            // border: "1px solid rgb(209 213 219)",
            borderRight: "none",
            borderRadius: "8px 0 0 8px",
            padding: "0 8px",
            height: "100%",
          },
          dropdownStyleProps: {
            style: {
              zIndex: 9999,
            },
            // ✅ Fix #2: Show flag + country name in dropdown
            renderItem: ({ country }) => {
              const { name, iso2, dialCode } = parseCountry(country);
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                  }}
                >
                  <img
                    src={`https://flagcdn.com/24x18/${iso2}.png`}
                    alt={name}
                    style={{
                      width: 24,
                      height: 18,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "#111" }}>
                    {name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginLeft: "auto",
                    }}
                  >
                    +{dialCode}
                  </span>
                </div>
              );
            },
          },
        }}
        inputStyle={{
          width: "100%",
          height: "42px",
          backgroundColor: "#FAFAFA",
          //   border: "1px solid rgb(209 213 219)",
          borderLeft: "none",
          borderRadius: "0 8px 8px 0",
          color: "black",
          fontSize: "0.875rem",
          padding: "0.975rem",
          outline: "none",
          boxShadow: "none",
          opacity: 1,
        }}
        style={{
          width: "100%",
          opacity: 1,
        }}
        disableDialCodeAndPrefix={false}
        showDisabledDialCodeAndPrefix={true}
      />

      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
      )}
    </div>
  );
};

export default PhoneNumberField;
