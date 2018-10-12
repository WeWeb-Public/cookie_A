<template>
    <div class="cookie_A floating-button-container">

        <div v-if="!isCookieAgreed" class="cookie-msg-container">
            <div class="content-container">
                <wwObject v-bind:ww-object-ref="section.data.content" v-bind:ww-object-types-allowed="['ww-text']" v-bind:ww-default-object-type="ww-text"></wwObject>
            </div>

            <div class="close-container" v-on:click="closeCookie()">
                <wwObject v-bind:ww-object-ref="section.data.close" v-bind:ww-object-types-allowed="['ww-icon', 'ww-button', 'ww-image']" v-bind:ww-default-object-type="ww-icon"></wwObject>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "cookie_A",
    props: {
        sectionRef: Object
    },
    data() {
        return {
            isCookieAgreed: false
        }
    },
    computed: {
        section() {
            //return this.sectionRef.wwGet();
            return this.$store.state.sections[this.sectionRef.id];
        }
    },
    methods: {
        init: function (section) {
            this.isCookieAgreed = this.$cookies.get('is-cookies-agreed') || false;
            this.section.data.buttons = this.section.data.buttons || [];
        },
        closeCookie: function () {
            // Remove cookie
            this.$cookies.remove('is-cookies-agreed');

            // Set in cookies the isCookieAgreed for 24h
            var in24h = new Date();
            in24h.setDate(in24h.getDate() + 1);
            this.$cookies.set('is-cookies-agreed', true, { 'expires': in24h, path: '/' });
            this.isCookieAgreed = true;
        }
    },
    created: function () { },
    mounted: function () {
        this.init()
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cookie_A {
  width: 100%;
  height: auto;
}

.cookie_A.floating-button-container {
  position: fixed;
  z-index: 100;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.cookie_A .cookie-msg-container {
  background: rgba(246, 249, 252, 0.9);
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 15px;
  color: #424770;
  margin: 0 auto;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.cookie_A .content-container {
  padding: 8px 5px 8px 15px;
}

.cookie_A .close-container {
  cursor: pointer;
}
</style>
