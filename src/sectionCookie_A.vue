<template>
    <div class="cookie_A floating-button-container">
        <div v-if="!isCookieAgreed" class="cookie-msg-container">
            <!-- wwManager:start -->
            <wwSectionEditMenu size="small" :sectionCtrl="sectionCtrl"></wwSectionEditMenu>
            <!-- wwManager:end -->
            <wwObject :ww-object="section.data.background" class="background" ww-category="background"></wwObject>

            <div class="content-container">
                <wwObject :ww-object="section.data.content" :ww-object-types-allowed="['ww-text']" ww-default-object-type="ww-text"></wwObject>
            </div>

            <div class="close-container" @click="closeCookie()">
                <wwObject :ww-object="section.data.close" :ww-object-types-allowed="['ww-icon', 'ww-button', 'ww-image']" ww-default-object-type="ww-icon"></wwObject>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "__COMPONENT_NAME__",
    props: {
        sectionCtrl: Object
    },
    data() {
        return {
            isCookieAgreed: false
        }
    },
    computed: {
        section() {
            return this.sectionCtrl.get();
        }
    },
    methods: {
        initData() {
            //Init objects
            let needUpdate = false;
            if (!this.section.data.background) {
                this.section.data.background = wwLib.wwObject.getDefault({ type: 'ww-color', data: { color: '#f6f9fce6' } });
                needUpdate = true;
            }
            if (!this.section.data.content) {
                this.section.data.content = wwLib.wwObject.getDefault({
                    type: 'ww-text',
                });
                needUpdate = true;
            }
            if (!this.section.data.close) {
                this.section.data.close = wwLib.wwObject.getDefault({
                    type: 'ww-icon',
                });
                needUpdate = true;
            }

            if (needUpdate) {
                this.sectionCtrl.update(this.section);
            }
        },
        init() {
            this.isCookieAgreed = this.$cookies.get('is-cookies-agreed') || false;
        },
        closeCookie() {
            // Remove cookie
            this.$cookies.remove('is-cookies-agreed');

            // Set in cookies the isCookieAgreed for 24h
            var in24h = new Date();
            in24h.setDate(in24h.getDate() + 1);
            this.$cookies.set('is-cookies-agreed', true, { 'expires': in24h, path: '/' });
            this.isCookieAgreed = true;
        }
    },
    created() {
        this.initData();
    },
    mounted() {
        this.init();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cookie_A {
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 100;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;

    .cookie-msg-container {
        position: relative;
        background: white;
        box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
        font-size: 15px;
        margin: 0 auto;
        display: inline-flex;
        align-items: center;

        .background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .content-container {
            padding: 8px 5px 8px 15px;
        }

        .close-container {
            position: relative;
            cursor: pointer;
        }
    }
}
</style>
