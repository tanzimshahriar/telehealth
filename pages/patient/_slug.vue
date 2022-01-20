<template>
  <div class="p-6 md:p-12 lg:px-16 xl:px-32">
    <div v-if="$fetchState.pending" class="py-4 text:xl md:text-3xl">
      Loading...
    </div>
    <div v-else-if="$fetchState.error" class="py-4 text:xl md:text-3xl">
      Network Failed. Please check your internet connection.
    </div>
    <div v-else>
      <!--Row-->
      <div class="flex">
        <div class="flex-grow">
          <h1 class="text-2xl md:text-3xl xl:text-4xl pb-4">
            {{
              patient.FirstName +
              " " +
              (patient.MiddleName ? patient.MiddleName + " " : "") +
              patient.LastName
            }}
          </h1>
          <h1 class="text-lg xl:text-2xl pb-4">Basic Information</h1>
        </div>

        <!--Edit and delete button on the right-->
        <div class="flex gap-2">
          <!--<button aria-label="Edit button" @click="editing=!editing" class="bg-blue-600 text-white p-1 h-6 md:h-10 rounded-md md:px-2 text-[12px] md:text-md xl:text-lg">{{editing?'Cancel' : 'Edit'}}</button>-->
          <button
            aria-label="delete"
            @click="deletePatient"
            class="bg-red-500 h-8 md:h-10 rounded-md text-white py-2 px-3 flex items-center justify-center"
            :class="deleting ? 'bg-gray-200 text-black' : ''"
            :disabled="deleting"
          >
            <img
              class="w-5 h-5 animate-spin"
              :src="require('~/assets/loading.svg')"
              v-if="deleting"
            />
            <span :class="deleting ? 'pl-2' : ''">Delete</span>
          </button>
        </div>
      </div>

      <!--Basic info Container-->
      <div class="flex flex-col-reverse md:flex-row bg-gray-100 items-start">
        <div class="p-3 md:p-6 grid grid-cols-12 gap-y-4 gap-x-8 flex-grow">
          <div
            class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
          >
            <div>First Name<span class="text-red-500">*</span></div>

            <input
              :disabled="!editing"
              class="rounded-md px-2 border h-10 w-full"
              v-model="newPatient.FirstName"
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
            <input
              :disabled="!editing"
              class="rounded-md px-2 border h-10 w-full"
              v-model="newPatient.MiddleName"
            />
          </div>

          <div
            class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
          >
            <div>Last Name<span class="text-red-500">*</span></div>
            <input
              :disabled="!editing"
              class="rounded-md px-2 border h-10 w-full"
              v-model="newPatient.LastName"
            />
            <div v-if="l_name_error" class="text-[12px] text-red-500">
              last name is required
            </div>
          </div>

          <div
            class="text-sm font-medium col-span-12 sm:col-span-6 xl:col-span-4"
          >
            <div>Date of Birth<span class="text-red-500">*</span></div>
            <input
              v-model="newPatient.Birthday"
              class="rounded-md px-2 border h-10 w-full"
              :disabled="!editing"
            ></input>
            <div v-if="b_date_error" class="text-[12px] text-red-500">
              birthday is required
            </div>
          </div>

          <div class="col-span-12 sm:col-span-6 xl:col-span-4 font-medium">
            <div class="text-sm">Gender<span class="text-red-500">*</span></div>
            <select
              :disabled="!editing"
              v-model="newPatient.Gender"
              class="rounded-md px-2 border h-10 w-full"
            >
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
            class="object-cover rounded-md h-[150px] w-[150px] xl:w-[200px] xl:h-[200px]"
            :src="
              newPatient.Picture &&
              newPatient.Picture.data &&
              newPatient.Picture.data.attributes &&
              newPatient.Picture.data.attributes.url
                ? formatImage(newPatient.Picture.data.attributes, 'small')
                : require('~/assets/default.png')
            "
          />
        </div>
      </div>

      <!--Profile pic upload-->

      <!--Address-->
      <h1 class="text-lg xl:text-2xl py-4">Address</h1>
      <div
        class="bg-gray-100 p-3 md:p-6 grid-cols-1 grid md:grid-cols-12 gap-y-4 gap-x-8"
      >
        <div class="text-sm font-medium col-span-6">
          <div>Address Line 1<span class="text-red-500">*</span></div>
          <input
            :disabled="!editing"
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.AddressLine1"
          />
          <div v-if="address_1_error" class="text-[12px] text-red-500">
            Address is required
          </div>
        </div>
        <div class="text-sm font-medium col-span-6">
          <div>Address Line 2</div>
          <input
            :disabled="!editing"
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.AddressLine2"
          />
        </div>
        <div class="text-sm font-medium col-span-6 lg:col-span-4">
          <div>City<span class="text-red-500">*</span></div>
          <input
            :disabled="!editing"
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.City"
          />
          <div v-if="city_error" class="text-[12px] text-red-500">
            city is required
          </div>
        </div>
        <div class="text-sm font-medium col-span-6 lg:col-span-4">
          <div>Postcode<span class="text-red-500">*</span></div>
          <input
            :disabled="!editing"
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.Postcode"
          />
          <div v-if="postcode_error" class="text-[12px] text-red-500">
            postcode is required
          </div>
        </div>
      </div>

      <!--Contact-->
      <h1 class="text-lg xl:text-2xl py-4">Contact</h1>
      <div
        class="bg-gray-100 p-3 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-y-4 gap-x-8"
      >
        <div class="text-sm font-medium sm:col-span-6 md:col-span-4">
          <div>Phone<span class="text-red-500">*</span></div>
          <input
            class="rounded-md px-2 border h-10 w-full"
            :disabled="!editing"
            v-model="newPatient.Phone"
          />
          <div v-if="phone_error" class="text-[12px] text-red-500">
            10 digits australian phone required
          </div>
        </div>
        <div class="text-sm font-medium sm:col-span-6 md:col-span-4">
          <div>Email<span class="text-red-500">*</span></div>
          <input
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.Email"
            :disabled="!editing"
          />
          <div v-if="email_error" class="text-[12px] text-red-500">
            email is required
          </div>
        </div>
        <div class="text-sm font-medium sm:col-span-6 md:col-span-4">
          <div>Emergency Contact<span class="text-red-500">*</span></div>
          <input
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.EmergencyContact"
            :disabled="!editing"
          />
          <div v-if="emergency_contact_error" class="text-[12px] text-red-500">
            emergency contact is required
          </div>
        </div>
        <div class="text-sm font-medium sm:col-span-6 md:col-span-4">
          <div>Emergency Contact Phone<span class="text-red-500">*</span></div>
          <input
            class="rounded-md px-2 border h-10 w-full"
            v-model="newPatient.EmergencyContactPhone"
            :disabled="!editing"
          />
          <div
            v-if="emergency_contact_phone_error"
            class="text-[12px] text-red-500"
          >
            10 digits australian phone required
          </div>
        </div>
      </div>
    </div>

    <!--Save and cancel button-->
    <!--<div class="flex justify-end py-4 gap-3" v-if="editing">
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
    </div>-->
  </div>
</template>
<script>
import uploadFile from "~/apollo/mutations/upload";
import deletePatient from "~/apollo/mutations/deletePatient";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import utils from "~/mixins.js/utils";

import patientQuery from "~/apollo/queries/patient";

export default {
  components: { DatePicker },
  data() {
    return {
      editing: false,
      saving: false,
      deleting: false,
      patient: {},
      newPatient: {},
      f_name_error: false,

      l_name_error: false,

      email_error: false,

      b_date_error: false,

      address_1_error: false,

      city_error: false,

      postcode_error: false,

      phone_error: false,

      gender_error: false,

      emergency_contact_error: false,

      emergency_contact_phone_error: false,

      IMAGE_URL: process.env.IMAGE_URL,
    };
  },

  async fetch() {
    await this.$apollo
      .query({
        query: patientQuery,
        variables: { id: this.$route.params.slug },
      })
      .then(({ data }) => {
        this.patient = data.patients.data[0].attributes;
        this.newPatient = Object.assign({}, data.patients.data[0].attributes);
      });
  },
  fetchKey: "patientFetch",

  methods: {
    deletePatient() {
      this.deleting = true;
      const id = this.$route.params.slug;
      this.$apollo
        .mutate({
          mutation: deletePatient,
          variables: { id: id },
        })
        .then(({ data }) => {
          console.log(data);
          this.deleting = false;
          this.$router.push({ path: "/" });
        });
    },
  },
  computed: {
    faArrowLeft() {
      return faArrowLeft;
    },
  },
  mixins: [utils],
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
