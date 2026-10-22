FROM ruby:3.4-alpine

RUN gem install webrick --no-document
WORKDIR /app
COPY app.rb .
ENV PORT=8080
EXPOSE 8080
CMD ["ruby", "app.rb"]
