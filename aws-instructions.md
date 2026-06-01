# AWS Konfiqurasiya Təlimatı

Bu sənəd "Serverless Dropbox Clone" layihəsinin AWS xidmətlərinin (S3, Lambda, API Gateway və Amplify) qurulması üçün addım-addım təlimatları ehtiva edir.

## 1. Amazon S3 (Fayl Saxlama və Versiyalama)
1. **AWS Console**-da **S3** xidmətinə daxil olun.
2. **Create bucket** düyməsini basın.
3. Bucket üçün unikal bir ad daxil edin (məs., `serverlessbox-uploads-bucket`).
4. **Bucket Versioning** bölməsində **Enable** seçin (bu, Dropbox kimi fayl versiyalarının qorunmasını təmin edəcək).
5. **Block Public Access** ayarlarını ehtiyacınıza uyğun qurun (adətən bağlı qalır, fayllar signed URL vasitəsilə yüklənir).
6. **Create bucket** düyməsini sıxaraq tamamlayın.
7. Bucket-ə daxil olub **Permissions** tabına keçin və **CORS** qaydasını əlavə edin ki, frontend tətbiqi fayl yükləyə bilsin:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

## 2. AWS Lambda & API Gateway (Backend Logika)
1. **Lambda** xidmətinə keçin və **Create function** klikləyin.
2. Ad olaraq `getPresignedUrl`, Runtime olaraq **Node.js 18.x** və ya **20.x** seçin.
3. Funksiya yaradıldıqdan sonra `aws/lambda/uploadFile.js` faylındakı kodu `index.js` hissəsinə yapışdırın.
4. **Configuration > Environment variables** bölməsində yeni bir dəyişən əlavə edin: 
   - Key: `UPLOAD_BUCKET`
   - Value: S3 bucket-inizin adı (məs., `serverlessbox-uploads-bucket`)
5. **Configuration > Permissions** bölməsində Lambda roluna `s3:PutObject` və S3 oxuma icazələrini (IAM Policy) əlavə edin.
6. **Add trigger** klikləyərək **API Gateway** seçin.
7. Yeni **REST API** yaradın, Security olaraq **Open** (və ya Cognito inteqrasiyası ilə) seçin və yaradın.
8. API Gateway URL-ni kopyalayın, bu sizin React tətbiqinizdə S3-ə yükləmə etmək üçün istifadə olunacaq.

## 3. AWS Amplify & Cognito (Auth və Hostinq)
1. **AWS Amplify** xidmətinə keçin.
2. Yeni bir tətbiq (app) yaradın. **Host web app** seçin və layihənin GitHub reposunu bağlayın.
3. Build settings avtomatik təyin ediləcək, layihəni deploy edin.
4. Authentication (Giriş/Qeydiyyat) üçün Cognito User Pool yaradın:
   
   **Seçim A: CLI vasitəsilə (Tövsiyə olunur)**
   - Terminalda layihə qovluğunda aşağıdakı komandasını çalıştırın:
     ```bash
     amplify add auth
     ```
   - Suallar soruşulacaq, aşağıdakı cavabları seçin:
     - "Do you want to use the default authentication and security configuration?" → **Yes, use the default config.**
     - "How do you want users to be able to sign in?" → **Username** (və ya E-mail)
     - "Do you want to configure advanced settings?" → **No, I am done.**
   - Daha sonra əlavə etdiklərinizi deploy edin:
     ```bash
     amplify push
     ```
   
   **Seçim B: Amplify Studio vasitəsilə**
   - AWS Console-da **Amplify** xidmətinə daxil olun
   - Layihəni seçin
   - **Authentication** tabına keçin
   - **Set up authentication** düyməsini basın
   - **Cognito User Pool** seçin
   - Tələb olunan ayarları qiymətləndirin (username/email, parol tələbləri və s.)
   - **Save and Deploy** düyməsini basın

5. Amplify konfigurasyonu `src` qovluğunda `aws-exports.js` faylı ilə avtomatik yaradılacaq.
   - `src/index.js` faylını açın və aşağıdakı kodları əlavə edin:
     ```javascript
     import { Amplify } from 'aws-amplify';
     import awsExports from './aws-exports';
     
     Amplify.configure(awsExports);
     ```
   
   - `src/App.js` faylında authentication komponentini istifadə edin:
     ```javascript
     import { Authenticator } from '@aws-amplify/ui-react';
     
     function App() {
       return (
         <Authenticator>
           {({ signOut, user }) => (
             <div>
               <p>Salam {user.username}!</p>
               <button onClick={signOut}>Çıxış</button>
               {/* Digər komponentlər */}
             </div>
           )}
         </Authenticator>
       );
     }
     ```
   
   - Daha sonra npm paketlərini quraşdırın:
     ```bash
     npm install aws-amplify @aws-amplify/ui-react
     ```

Bu quraşdırma sayəsində AWS Free Tier çərçivəsində işləyən və Serverless memarlıqla idarə olunan fayl saxlama sistemi əldə edəcəksiniz.