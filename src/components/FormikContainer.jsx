import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextError } from "./TextError";

export const FormikContainer = () => {
  const optionsForSelect = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];

  const optionsForRadio = [
    { key: "Option 1", value: "rOption1" },
    { key: "Option 2", value: "rOption2" },
    { key: "Option 3", value: "rOption3" },
  ];

  const forCheckboxOptions = [
    { key: "Option 1", value: "cOption1" },
    { key: "Option 2", value: "cOption2" },
    { key: "Option 3", value: "cOption3" },
  ];

  const initialValues = {
    email: "a@mail.ru",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxList: [],
    birthDate: null,
    birthDate2: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().required("Required"),
    description: yup.string().required("Required"),
    selectOption: yup.string().required("Required"),
    radioOption: yup.string().required("Required"),
    checkboxList: yup
      .array()
      .min(1, "You need at least one")
      .required("Required"),
    birthDate: yup.date().required("Required").nullable(),
  });

  const onSubmit = (values) => {
    return console.log("From data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="from-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component={TextError} />
          </div>

          <div className="from-control">
            <label htmlFor="description">Comments</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component={TextError} />
          </div>

          <div className="from-control">
            <label htmlFor="selectOption">Select a topic</label>
            <Field as="select" id="selectOption" name="selectOption">
              {optionsForSelect.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage name="selectOption" component={TextError} />
          </div>

          <div className="from-control">
            <div>Radio Topic</div>

            {optionsForRadio.map((option, index) => {
              return (
                <div key={index}>
                  <label htmlFor="radioOption">
                    <Field
                      type="radio"
                      name="radioOption"
                      value={option.value}
                    />
                    {option.key}
                  </label>
                </div>
              );
            })}

            <ErrorMessage name="radioOption" component={TextError} />
          </div>

          <div className="from-control">
            <div>Checkbox topics</div>

            {forCheckboxOptions.map((option) => {
              return (
                <div key={option.value}>
                  <label htmlFor="checkboxList">
                    <Field
                      type="checkbox"
                      name="checkboxList"
                      value={option.value}
                    />
                    {option.key}
                  </label>
                </div>
              );
            })}

            <ErrorMessage name="checkboxList" component={TextError} />
          </div>

          <div className="from-control">
            <label htmlFor="birthDate">Pick a date</label>

            <Field type="text" id="birthDate" name="birthDate">
              {({ form, field }) => {
                const { setFieldValue } = form;
                const { value } = field;

                return (
                  <DatePicker
                    id="birthDate"
                    selected={value}
                    onChange={(date) => setFieldValue("birthDate", date)}
                  />
                );
              }}
            </Field>
            <ErrorMessage name="birthDate" component={TextError} />
          </div>

          <div className="from-control">
            <label htmlFor="date2">Date 2 manual</label>
            <Field type="date" name="birthDate2" />
          </div>

          <div className="from-control">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
          </div>

          <button type="submit" style={{ marginTop: "50px" }}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
