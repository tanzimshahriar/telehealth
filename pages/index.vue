<template>
  <main class="p-6 md:py-12 lg:py-16 xl:px-32">
  <h1 class="text-2xl md:text-3xl xl:text-4xl pb-4">Patients List</h1>
    
    <div class="flex items-center justify-end gap-2 md:gap-4 pb-6 flex-wrap">
      <!--Filters-->
      <select v-model="sort" @change="$fetch" name="choice" class="rounded-md border text-sm md:text-md p-1 md:p-2 bg-gray-100">
        <option value="createdAt:asc">Newest</option>
        <option value="createdAt:desc">Oldest</option>
      </select>

       <!--New Entry-->
      <nuxt-link
        aria-label="new"
        v-if="$route.path === '/'"
        to="/new"
        class="flex items-center bg-blue-600 rounded-md text-white text-sm md:text-md p-1 md:p-2"
        ><fa class="block mr-2 fa-sm" :icon="faPlus" />Create New Entry
      </nuxt-link>
       <!--Search-->
      <input v-model="search" class="border border-gray-200 bg-gray-100 py-1 px-2 rounded-md" placeholder="Quick Search...">
    </div>

     <!--When Searched-->
     <div v-if="search && search!=''" class="text-lg py-3">Showing results for "{{search}}"</div>

    <!--List Container-->
    <div class="grid grid-cols-12 gap-4">
      <!--Each Patient-->
      <div v-for="(p,i) in (search && search !==''? searchResults : patients)" :key="i" class="shadow-lg text-sm 3xl:text-lg flex flex-col items-start p-4 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 bg-gray-100 rounded-md">
        <!--Row-->
        <div class="flex w-full gap-2 lg:gap-4">
          <img class="h-[80px] w-[80px] lg:w-[100px] lg:h-[100px] 3xl:h-[130px] 3xl:w-[130px] 4xl:h-[140px] 4xl:w-[140px] 5xl:h-[150px] 5xl:w-[150px]" v-if="p.attributes.Picture && p.attributes.Picture.data && p.attributes.Picture.data.attributes && p.attributes.Picture.data.attributes.url" :src="url + p.attributes.Picture.data.attributes.url" :alt="p.attributes.FirstName + ' image'" />
          <img class="h-[80px] w-[80px] lg:w-[100px] lg:h-[100px] 3xl:h-[130px] 3xl:w-[130px] 4xl:h-[140px] 4xl:w-[140px] 5xl:h-[150px] 5xl:w-[150px]" v-else alt="default profile pic" :src="require('~/assets/default.png')" />
          
          <!--Column-->
          <div class="flex flex-col">
            <h4 class="font-bold text-[10.5px] uppercase">Name</h4>
            <div>{{ p.attributes.FirstName + ' ' + (p.attributes.MiddleName? (p.attributes.MiddleName + ' ') : '') + p.attributes.LastName }}</div>
            <h4 class="pt-1 font-bold text-[10.5px] uppercase">Birthday</h4>
            <div>{{p.attributes.Birthday}}</div>
          </div>
        </div>
        <div></div>

        <!--Grid-->
        <div class="grid grid-cols-2 w-full break-all gap-x-2 gap-y-1 pt-2">
          <div>
            <h4 class="font-bold text-[10.5px] uppercase">Gender</h4>
            <div>{{p.attributes.Gender}}</div>
          </div>
          <div>
            <h4 class="font-bold text-[10.5px] uppercase">Phone</h4>
            <div>{{p.attributes.Phone}}</div>
          </div>
     

          <div>
            <h4 class="font-bold text-[10.5px] uppercase">Email</h4>
            <div>{{p.attributes.Email}}</div>
          </div>
          <div class="pb-3">
            <h4 class="font-bold text-[10.5px] uppercase">Emergency Contact</h4>
            <div>{{p.attributes.EmergencyContact}}</div>
            <div>{{p.attributes.EmergencyContactPhone}}</div>
          </div>

          <div class="col-span-2 pt-4 border-t border-top-gray-200">
            <h4 class="font-bold text-[10.5px] uppercase">Address</h4>
            <div>{{p.attributes.AddressLine1}}</div>
            <div v-if="p.attributes.AddressLine2">{{p.attributes.AddressLine2}}</div>
          </div>

          <div>
            <h4 class="font-bold text-[10.5px] uppercase">City</h4>
            <div>{{p.attributes.City}}</div>
           
          </div>

          <div>
            <h4 class="font-bold text-[10.5px] uppercase">Postcode</h4>
            <div>{{p.attributes.Postcode}}</div>
      
          </div>
          
        </div>
        
      </div>
    </div>
  </main>
</template>

<script>
import patientsQuery from "~/apollo/queries/patients";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default {
  data() {
    return {
      view: "card",
      sort: "createdAt:asc",
      patients: [],
      url: process.env.IMAGE_URL,
      search: ""
    };
  },
  computed: {
    faPlus() {
      return faPlus;
    },
    searchResults() {
      if(this.patients.length==0) {return []}
      return this.patients.filter(p => 
        //name 
        (p.attributes.FirstName + ' ' + (p.attributes.MiddleName? (p.attributes.MiddleName + ' ') : '') + p.attributes.LastName).toLowerCase().includes(this.search.toLowerCase())
        // birthday
    || p.attributes.Birthday.toLowerCase().includes(this.search.toLowerCase())
      // gender
    || p.attributes.Gender.toLowerCase().includes(this.search.toLowerCase())
        // Email
    || p.attributes.Email.toLowerCase().includes(this.search.toLowerCase())
        // Phone
    || p.attributes.Phone.toLowerCase().includes(this.search.toLowerCase())
     // EmergencyContact
    || p.attributes.EmergencyContact.toLowerCase().includes(this.search.toLowerCase())
     // EmergencyContactPhone
    || p.attributes.EmergencyContactPhone.toLowerCase().includes(this.search.toLowerCase())
     // AddressLine1
    || p.attributes.AddressLine1.toLowerCase().includes(this.search.toLowerCase())
        // AddressLine2
    || p.attributes.AddressLine2.toLowerCase().includes(this.search.toLowerCase())
     // City
    || p.attributes.City.toLowerCase().includes(this.search.toLowerCase())
     // Postcode
    || p.attributes.Postcode.toLowerCase().includes(this.search.toLowerCase())
      
      )
    }
  },
  async fetch() {
  await this.$apollo.query({ query: patientsQuery, variables: { sort: this.sort } }).then(({ data }) => {
      this.patients = data.patients.data;
    });
  },
  
};
</script>
