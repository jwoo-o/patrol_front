import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
  if (sessionStorage.getItem("token") != null) return next();

  next("/");
};

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth()
  },
  {
    path: "/line_patrol",
    name: "line_patrol",
    component: () => import("../views/line_patrol.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/daily_patrol",
    name: "daily_patrol",
    component: () => import("../views/daily_patrol.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/emergency_contact",
    name: "emergency_contact",
    component: () => import("../views/emergency_contact.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/search_car",
    name: "search_car",
    component: () => import("../views/search_car.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/car_report_new",
    name: "car_report_new",
    component: () => import("../views/car_report_new.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/car_report_exist",
    name: "car_report_exist",
    component: () => import("../views/car_report_exist.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/currentPatrol_report",
    name: "currentPatrol_report",
    component: () => import("../views/currentPatrol_report.vue"),
    beforeEnter: requireAuth()
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
