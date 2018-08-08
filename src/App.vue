<template>
    <main>
        <v-app>
            <v-content v-if="$store.state.loaded">

                <guest-navigation v-if="role === 'guest'" />
                <admin-navigation v-if="role === 'admin'" />
                <customer-navigation v-if="role === 'customer'" />

                <v-container class="my-5">
                    <v-alert :type="$store.state.alert.type" :value="$store.state.alert.show">
                        {{$store.state.alert.message}}
                    </v-alert>

                    <router-view />
                </v-container>
                <app-footer />
            </v-content>
            <v-container v-else fill-height>
                <v-layout flex align-center justify-center>
                    <v-progress-circular indeterminate :size="100" :width="10" color="purple"></v-progress-circular>
                </v-layout>
            </v-container>
        </v-app>
    </main>
</template>

<script>
import GuestNavigation from "@/navigations/Guest";
import AdminNavigation from "@/navigations/Admin";
import CustomerNavigation from "@/navigations/Customer";

import AppFooter from "@/components/Footer";
import { mapGetters } from "vuex";

export default {
    name: "App",
    components: {
        GuestNavigation,
        AdminNavigation,
        CustomerNavigation,
        AppFooter
    },
    computed: {
        ...mapGetters(["role"])
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
