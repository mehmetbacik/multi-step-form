<template>
    <div>
        <h2>Your Info</h2>
        <form @submit.prevent="validateAndProceed">
            <div>
                <label for="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    v-model="name"
                    @blur="validateName"
                    :class="{ 'is-invalid': errors.name }"
                />
                <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
            </div>
            <div>
                <label for="email">Email Address:</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    @blur="validateEmail"
                    :class="{ 'is-invalid': errors.email }"
                />
                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
            </div>
            <div>
                <label for="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    v-model="phone"
                    @input="validatePhoneNumber"
                    @blur="validatePhoneNumber"
                    :class="{ 'is-invalid': errors.phone }"
                />
                <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
            </div>
            <button :disabled="!isFormValid" type="submit">Next</button>
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
                // Bilgileri yerel depolamaya kaydet
                localStorage.setItem('name', this.name);
                localStorage.setItem('email', this.email);
                localStorage.setItem('phone', this.phone);
        
                // İleri gitme işlemi burada gerçekleştirilebilir
                this.$emit('next-step', { name: this.name, email: this.email, phone: this.phone });
                }
            },
            isValidEmail(email) {
                // Basit bir email doğrulama
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