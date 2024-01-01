<template>
    <div class="your-info">
        <div class="headline">
            <span>Personal info</span>
            <p>Please provide your name, email address, and phone number.</p>
        </div>
        <form @submit.prevent="validateAndProceed">
            <div class="input-content">
                <div class="title-area">
                    <label for="name">Name</label>
                    <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
                </div>
                <input
                    type="text"
                    id="name"
                    v-model="name"
                    @blur="validateName"
                    :class="{ 'is-invalid': errors.name }"
                />
            </div>
            <div class="input-content">
                <div class="title-area">
                    <label for="email">Email Address</label>
                    <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
                </div>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    @blur="validateEmail"
                    :class="{ 'is-invalid': errors.email }"
                />
            </div>
            <div class="input-content">
                <div class="title-area">
                    <label for="phone">Phone Number</label>
                    <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
                </div>
                <input
                    type="text"
                    id="phone"
                    v-model="phone"
                    @input="validatePhoneNumber"
                    @blur="validatePhoneNumber"
                    :class="{ 'is-invalid': errors.phone }"
                />
            </div>
            <div class="button-area">
                <button :disabled="!isFormValid" type="submit" class="next-button">Next Step</button>
            </div>
            
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: localStorage.getItem('name') || '',
                email: localStorage.getItem('email') || '',
                phone: localStorage.getItem('phone') || '',
                errors: {
                name: '',
                email: '',
                phone: ''
                }
            };
        },
        computed: {
            isFormValid() {
                return this.name && this.isValidEmail(this.email) && !this.errors.phone;
            }
        },
        methods: {
            validateAndProceed() {
                this.errors = {
                name: !this.name ? 'Name is required.' : '',
                email: !this.isValidEmail(this.email) ? 'Please enter a valid email address.' : '',
                phone: !this.phone || this.errors.phone ? 'Please enter a valid phone number.' : ''
                };
        
                if (this.isFormValid) {
                localStorage.setItem('name', this.name);
                localStorage.setItem('email', this.email);
                localStorage.setItem('phone', this.phone);
        
                
                this.$emit('next-step', { name: this.name, email: this.email, phone: this.phone });
                }
            },
            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            validateName() {
                this.errors.name = !this.name ? 'Name is required.' : '';
            },
            validateEmail() {
                this.errors.email = !this.isValidEmail(this.email) ? 'Please enter a valid email address.' : '';
            },
            validatePhoneNumber() {
                const phoneRegex = /^[0-9]+$/;
        
                if (!phoneRegex.test(this.phone)) {
                this.errors.phone = 'Please enter a valid phone number.';
                } else {
                this.errors.phone = '';
                }
            }
        }
    };
</script>