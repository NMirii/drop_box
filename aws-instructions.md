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
4. Authentication (Giriş/Qeydiyyat) üçün **Amplify Studio**-da **Authentication** əlavə edin və ya CLI vasitəsilə (`amplify add auth`) Cognito User Pool yaradın.
5. Yaranan konfiqurasiya detallarını (`aws-exports.js`) React layihənizin `src` qovluğuna əlavə edin və `index.js`-də Amplify.configure() daxilində çağırın.

Bu quraşdırma sayəsində AWS Free Tier çərçivəsində işləyən və Serverless memarlıqla idarə olunan fayl saxlama sistemi əldə edəcəksiniz.