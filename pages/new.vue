<template>
  <div class="p-6 md:p-12 lg:px-16 xl:px-32">
    <h1 class="text-2xl md:text-3xl xl:text-4xl pb-4">Add New Patient</h1>
    <h1 class="text-lg xl:text-2xl pb-4">Basic Information</h1>

    <!--Basic info Container-->
    <div class="flex flex-col-reverse md:flex-row bg-gray-100 items-start">
      <div class="p-3 md:p-6 grid grid-cols-12 gap-y-4 gap-x-8 flex-grow">
        <div
          class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
        >
          <div>First Name<span class="text-red-500">*</span></div>

          <input
            class="rounded-md px-2 border h-10 w-full"
            v-model="f_name"
            ref="file"
          />
          <div v-if="f_name_error" class="text-[12px] text-red-500">
            first name is required
          </div>
        </div>

        <div
          class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
        >
          <div>Middle Name</div>
          <input class="rounded-md px-2 border h-10 w-full" v-model="m_name" />
        </div>

        <div
          class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
        >
          <div>Last Name<span class="text-red-500">*</span></div>
          <input class="rounded-md px-2 border h-10 w-full" v-model="l_name" />
          <div v-if="l_name_error" class="text-[12px] text-red-500">
            last name is required
          </div>
        </div>

        <div
          class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
        >
          <div>Date of Birth<span class="text-red-500">*</span></div>
          <date-picker v-model="b_date" type="date"></date-picker>
          <div v-if="b_date_error" class="text-[12px] text-red-500">
            birthday is required
          </div>
        </div>

        <div class="col-span-12 sm:col-span-6 xl:col-span-4 font-medium">
          <div class="text-sm">Gender<span class="text-red-500">*</span></div>
          <select v-model="gender" class="rounded-md px-2 border h-10 w-full">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div v-if="gender_error" class="text-[12px] text-red-500">
            Gender is required
          </div>
        </div>
      </div>

      <!--Profile pic upload-->

      <div class="flex flex-col items-center gap-2 p-6">
        <img
          class="rounded-md h-[150px] w-[150px] xl:w-[200px] xl:h-[200px]"
          :src="pic ? pic : require('~/assets/default.png')"
        />
        <button
          class="bg-blue-600 rounded-md px-2 py-1 text-white"
          @click="$refs.file.click()"
        >
          {{ pic ? "Edit Photo" : "Add Photo" }}
        </button>
        <input
          class="hidden"
          type="file"
          accept="image/jpeg"
          @change="uploadImage"
          ref="file"
        />
      </div>
    </div>

    <!--Address-->
    <h1 class="text-lg xl:text-2xl py-4">Address</h1>
    <div class="bg-gray-100 p-3 md:p-6 grid grid-cols-12 gap-y-4 gap-x-8">
      <div class="text-sm font-medium col-span-12 lg:col-span-6">
        <div>Address Line 1<span class="text-red-500">*</span></div>
        <input class="rounded-md px-2 border h-10 w-full" v-model="address_1" />
        <div v-if="address_1_error" class="text-[12px] text-red-500">
          Address is required
        </div>
      </div>
      <div class="text-sm font-medium col-span-12 lg:col-span-6">
        <div>Address Line 2</div>
        <input class="rounded-md px-2 border h-10 w-full" v-model="address_2" />
      </div>
      <div class="text-sm font-medium col-span-12 sm:col-span-6 md:col-span-4">
        <div>City<span class="text-red-500">*</span></div>
        <input class="rounded-md px-2 border h-10 w-full" v-model="city" />
        <div v-if="city_error" class="text-[12px] text-red-500">
          city is required
        </div>
      </div>
      <div class="text-sm font-medium col-span-12 sm:col-span-6 md:col-span-4">
        <div>Postcode<span class="text-red-500">*</span></div>
        <input class="rounded-md px-2 border h-10 w-full" v-model="postcode" />
        <div v-if="postcode_error" class="text-[12px] text-red-500">
          postcode is required
        </div>
      </div>
    </div>

    <!--Contact-->
    <h1 class="text-lg xl:text-2xl py-4">Contact</h1>
    <div class="bg-gray-100 p-3 md:p-6 grid grid-cols-12 gap-y-4 gap-x-8">
      <div class="text-sm font-medium col-span-12 sm:col-span-6 md:col-span-4">
        <div>Phone<span class="text-red-500">*</span></div>
        <input class="rounded-md px-2 border h-10 w-full" v-model="phone" />
        <div v-if="phone_error" class="text-[12px] text-red-500">
          phone is required
        </div>
      </div>
      <div class="text-sm font-medium col-span-12 sm:col-span-6 md:col-span-4">
        <div>Email<span class="text-red-500">*</span></div>
        <input class="rounded-md px-2 border h-10 w-full" v-model="email" />
        <div v-if="email_error" class="text-[12px] text-red-500">
          email is required
        </div>
      </div>
      <div class="text-sm font-medium col-span-12 sm:col-span-6 md:col-span-4">
        <div>Emergency Contact<span class="text-red-500">*</span></div>
        <input
          class="rounded-md px-2 border h-10 w-full"
          v-model="emergency_contact"
        />
        <div v-if="emergency_contact_error" class="text-[12px] text-red-500">
          emergency contact is required
        </div>
      </div>
      <div class="text-sm font-medium col-span-12 sm:col-span-6 md:col-span-4">
        <div>Emergency Contact Phone<span class="text-red-500">*</span></div>
        <input
          class="rounded-md px-2 border h-10 w-full"
          v-model="emergency_contact_phone"
        />
        <div
          v-if="emergency_contact_phone_error"
          class="text-[12px] text-red-500"
        >
          emergency contact phone is required
        </div>
      </div>
    </div>

    <div class="flex justify-end py-4 gap-3">
      <nuxt-link
        aria-label="save"
        to="/"
        class="block bg-gray-200 rounded-md text-blue-500 py-2 px-3"
      >
        Cancel
      </nuxt-link>

      <button
        aria-label="save"
        @click="save"
        class="bg-blue-600 rounded-md text-white py-2 px-3 flex items-center justify-center"
        :class="saving ? 'bg-gray-200 text-black' : ''"
        :disabled="saving"
      >
        <img
          class="w-5 h-5 animate-spin"
          :src="require('~/assets/loading.svg')"
          v-if="saving"
        />
        <span :class="saving ? 'pl-2' : ''">Save</span>
      </button>
    </div>
  </div>
</template>
<script>

import createPatient from "~/apollo/mutations/patient";
import uploadFile from "~/apollo/mutations/upload";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  data() {
    return {
      saving: false,
      f_name: "",
      f_name_error: false,
      m_name: "",
      l_name: "",
      l_name_error: false,
      email: "",
      email_error: false,
      b_date: "",
      b_date_error: false,
      address_1: "",
      address_1_error: false,
      address_2: "",
      city: "",
      city_error: false,
      postcode: "",
      postcode_error: false,
      phone: "",
      phone_error: false,
      gender: null,
      gender_error: false,
      pic: null,
      file: null,
      emergency_contact: "",
      emergency_contact_error: false,
      emergency_contact_phone: "",
      emergency_contact_phone_error: false,
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
  beforeRouteLeave(to, from, next) {
    if (this.confirmStayInDirtyForm()) {
      next(false);
    } else {
      // Navigate to next view
      next();
    }
  },

  methods: {
    preventNav(evt) {
      if (this.dirty_form) {
        const unsaved_changes_warning =
          "You have unsaved changes. Are you sure you wish to leave?";
        evt.returnValue = unsaved_changes_warning;
        return unsaved_changes_warning;
      }
    },
    confirmStayInDirtyForm() {
      return this.dirty_form && !this.confirmLeave();
    },
    confirmLeave() {
      return window.confirm(
        "Do you really want to leave? you have unsaved changes!"
      );
    },
    uploadImage(e) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.pic = e.target.result;
        console.log(this.pic);
      };
    },
    async save() {
      this.saving = true;
      let errors = 0;

      if (!this.f_name || this.f_name === "") {
        console.log("f_name");
        errors++;
        this.f_name_error = true;
      } else this.f_name_error = false;
      if (!this.l_name || this.l_name === "") {
        console.log("l_name");
        errors++;
        this.l_name_error = true;
      } else this.l_name_error = false;
      if (!this.b_date || this.b_date === "") {
        console.log("b_day");
        errors++;
        this.b_date_error = true;
      } else this.b_date_error = false;
      if (!this.gender || this.gender === "") {
        errors++;
        this.gender_error = true;
      } else this.gender_error = false;

      if (!this.address_1 || this.address_1 === "") {
        errors++;
        this.address_1_error = true;
      } else this.address_1_error = false;
      if (!this.city || this.city === "") {
        errors++;
        this.city_error = true;
      } else this.city_error = false;
      if (!this.postcode || this.postcode === "") {
        errors++;
        this.postcode_error = true;
      } else this.postcode_error = false;
      if (!this.phone || this.phone === "") {
        errors++;
        this.phone_error = true;
      } else this.phone_error = false;
      if (!this.email || this.email === "") {
        console.log("emaoil");
        errors++;
        this.email_error = true;
      } else this.email_error = false;
      if (!this.emergency_contact || this.emergency_contact === "") {
        errors++;
        this.emergency_contact_error = true;
      } else this.emergency_contact_error = false;
      if (
        !this.emergency_contact_phone ||
        this.emergency_contact_phone === ""
      ) {
        errors++;
        this.emergency_contact_phone_error = true;
      } else this.emergency_contact_phone_error = false;

      if (errors > 0) {
        this.saving = false;
        return;
      }

      const finalBday = new Date(this.b_date).toISOString().split("T")[0];

      //send apollo request to save the patient data

      await this.$apollo
        .mutate({
          mutation: createPatient,
          variables: {
            FirstName: this.f_name,
            MiddleName: this.m_name,
            LastName: this.l_name,
            Birthday: finalBday,
            Gender: this.gender,
            AddressLine1: this.address_1,
            AddressLine2: this.address_2,
            City: this.city,
            Postcode: this.postcode,
            Email: this.email,
            Phone: this.phone,
            EmergencyContact: this.emergency_contact,
            EmergencyContactPhone: this.emergency_contact_phone,
          },
        })
        .then((res) => {
          //this.saving = false;
          console.log("firstres:", res);

          //send apollo request to upload file
          if (this.pic && this.file) {
            this.$apollo
              .mutate({
                mutation: uploadFile,
                variables: {
                  refId: res.data.createPatient.data.id,
                  ref: "api::patient.patient",
                  field: "Picture",
                  file: this.file,
                },
              })
              .then((response) => {
                console.log("uploadFile", response);
              });
          }
          this.saving = false;
        });
    },
  },
  computed: {
    faArrowLeft() {
      return faArrowLeft;
    },
    dirty_form() {
      return (
        this.f_name !== "" ||
        this.m_name !== "" ||
        this.l_name !== "" ||
        this.email !== "" ||
        this.b_date !== "" ||
        this.address_1 !== "" ||
        this.address_2 !== "" ||
        this.city !== "" ||
        this.postcode !== "" ||
        this.phone !== "" ||
        this.gender !== null ||
        this.pic !== null ||
        this.file !== null ||
        this.emergency_contact !== "" ||
        this.emergency_contact_error !== false ||
        this.emergency_contact_phone !== "" ||
        this.emergency_contact_phone_error !== false
      );
    },
  },
};
</script>
<style lang="scss">
.mx-datepicker {
  width: 100%;
  .mx-input-wrapper {
    input {
      @apply border-gray-200;
      height: 39px;
    }
  }
}
</style>
