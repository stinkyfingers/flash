# vars
variable "region" {
  type = string
  default = "us-west-1"
}

# provider
provider "aws" {
  profile = "jds"
  region     = var.region
}

# s3
resource "aws_s3_bucket" "flash" {
  bucket = "flash.john-shenk.com"
  acl = "private"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "Cloudfront Read",
          "Effect": "Allow",
          "Principal": {
              "AWS": "${aws_cloudfront_origin_access_identity.flash.iam_arn}"
          },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::flash.john-shenk.com/*"
      }
  ]
}
EOF
}

resource "aws_s3_bucket_public_access_block" "flash" {
  bucket = aws_s3_bucket.flash.id
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_cloudfront_origin_access_identity" "flash" {
  comment = "flash.john-shenk.com identity"
}

locals {
  s3_origin_id = "flash-origin"
}

resource "aws_cloudfront_distribution" "flash" {
  origin {
    domain_name = aws_s3_bucket.flash.bucket_domain_name
    origin_id   = local.s3_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.flash.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["flash.john-shenk.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id
    trusted_signers = []

    forwarded_values {
      query_string = false
      query_string_cache_keys = []
      headers = []

      cookies {
        forward = "none"
        whitelisted_names = []
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 31536000
  }
  restrictions {
    geo_restriction {
        locations        = []
        restriction_type = "none"
    }
}

  viewer_certificate {
      acm_certificate_arn            = "arn:aws:acm:us-east-1:671958020402:certificate/ecf6d11e-1886-4666-9a42-a00252125b22"
      cloudfront_default_certificate = false
      minimum_protocol_version       = "TLSv1.1_2016"
      ssl_support_method             = "sni-only"
  }
}

resource "aws_route53_record" "flash" {
  zone_id = "Z3P68RXJ4VECYX"
  name    = "flash.john-shenk.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.flash.domain_name
    zone_id                = aws_cloudfront_distribution.flash.hosted_zone_id
    evaluate_target_health = false
  }
}
