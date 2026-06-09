import { Field } from "formik";
import { AlertCircle } from "lucide-react";
import React from "react";

const InputField = ({ label, formik }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor="notes"
          className="font-medium text-slate-700 text-sm mb-2 block"
        >
          Anything else you want us to know before the call?
        </label>
      )}
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
          <AlertCircle size={12} /> {formik.errors.notes}
        </span>
      )}
    </div>
  );
};

export default InputField;
